const express = require('express');
const router = express.Router();
const UserHistory = require('../models/UserHistory');
const axios = require('axios');
const questions = require('../questions.json');

// Utility to merge traits
function mergeTraits(acc, traits) {
  for (const k in traits) acc[k] = (acc[k] || 0) + traits[k];
  return acc;
}

// Convert scores to MBTI type
function scoresToType(scores) {
  const E = (scores.E || 0), I = (scores.I || 0);
  const S = (scores.S || 0), N = (scores.N || 0);
  const T = (scores.T || 0), F = (scores.F || 0);
  const J = (scores.J || 0), P = (scores.P || 0);
  const a = (E >= I) ? 'E' : 'I';
  const b = (S >= N) ? 'S' : 'N';
  const c = (T >= F) ? 'T' : 'F';
  const d = (J >= P) ? 'J' : 'P';
  return a + b + c + d;
}

// Build text from answers for ML model
function buildAnswerText(answers) {
  const textParts = [];
  for (const ans of answers) {
    const q = questions[ans.qId];
    if (q && q.options && q.options[ans.optionKey]) {
      // Include both question and selected answer
      textParts.push(`${q.text} ${q.options[ans.optionKey].text}`);
    }
  }
  return textParts.join(' ');
}

// POST /answers/submit
// body: { userId, answers: [ {qId, optionKey, traits}, ... ], typingText(optional) }
router.post('/submit', async (req, res) => {
  try {
    const { userId = 'anon', answers = [], typingText = '' } = req.body;

    // accumulate traits from answers (rule-based scoring)
    let scores = {};
    for (const ans of answers) {
      // ans.traits is an object like {E:1, J:1}
      mergeTraits(scores, ans.traits || {});
    }

    // Try to use ML model for enhanced prediction
    let mlPrediction = null;
    const answerText = buildAnswerText(answers);
    const combinedText = typingText 
      ? `${typingText} ${answerText}` 
      : answerText;

    // Use ML model if we have enough text (either from typing or answers)
    if (combinedText.trim().length > 10) {
      try {
        const flask = await axios.post('http://localhost:5000/predict', 
          { text: combinedText },
          { timeout: 5000 } // 5 second timeout
        );
        mlPrediction = flask.data.prediction;
        console.log(`✅ ML Model prediction: ${mlPrediction}`);
        
        // Combine ML prediction with rule-based scores
        // Give ML prediction higher weight (1.5) vs rule-based (1.0)
        if (mlPrediction && mlPrediction.length === 4) {
          const letters = mlPrediction.split('');
          const mlWeight = 1.5; // ML model gets 60% weight
          if (letters[0] === 'E') mergeTraits(scores, { E: mlWeight }); 
          else mergeTraits(scores, { I: mlWeight });
          if (letters[1] === 'S') mergeTraits(scores, { S: mlWeight }); 
          else mergeTraits(scores, { N: mlWeight });
          if (letters[2] === 'T') mergeTraits(scores, { T: mlWeight }); 
          else mergeTraits(scores, { F: mlWeight });
          if (letters[3] === 'J') mergeTraits(scores, { J: mlWeight }); 
          else mergeTraits(scores, { P: mlWeight });
        }
      } catch (err) {
        // ML API not available - continue with rule-based only
        console.warn('⚠ ML Model API not available (Flask server may not be running):', err.message);
        console.warn('⚠ Continuing with rule-based prediction only.');
      }
    }

    const predicted = scoresToType(scores);

    // Save to DB (history) - only if MongoDB is connected
    try {
      const entry = {
        date: new Date(),
        type: predicted,
        scores
      };
      await UserHistory.findOneAndUpdate(
        { userId },
        { $push: { history: entry } },
        { upsert: true, new: true }
      );
    } catch (dbError) {
      console.warn('Could not save to database:', dbError.message);
      // Continue without saving - the prediction still works
    }

    // Include ML prediction info in response
    return res.json({ 
      prediction: predicted, 
      scores,
      mlPrediction: mlPrediction || null,
      method: mlPrediction ? 'hybrid' : 'rule-based'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /answers/history/:userId
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const doc = await UserHistory.findOne({ userId });
    if (!doc) return res.json({ history: [] });
    res.json({ history: doc.history });
  } catch (dbError) {
    console.warn('Could not fetch history:', dbError.message);
    // Return empty history if DB is not available
    res.json({ history: [] });
  }
});

module.exports = router;