const express = require('express');
const router = express.Router();
const UserHistory = require('../models/UserHistory');
const axios = require('axios');

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

// POST /answers/submit
// body: { userId, answers: [ {qId, optionKey, traits}, ... ], typingText(optional) }
router.post('/submit', async (req, res) => {
  try {
    const { userId = 'anon', answers = [], typingText = '' } = req.body;

    // accumulate traits from answers
    let scores = {};
    for (const ans of answers) {
      // ans.traits is an object like {E:1, J:1}
      mergeTraits(scores, ans.traits || {});
    }

    // If typingText exists, send to Flask model for a text-based prediction/probs
    if (typingText && typingText.trim().length > 10) {
      try {
        const flask = await axios.post('http://localhost:5000/predict', { text: typingText });
        // flask returns { prediction: 'INFP', probabilities: [...] } - combine heuristically
        const textPred = flask.data.prediction;
        // Option: give small weight to text model by incrementing corresponding letters
        if (textPred && textPred.length === 4) {
          const letters = textPred.split('');
          // weight 0.7 -> add fractional scores
          const weight = 0.7;
          if (letters[0] === 'E') mergeTraits(scores, { E: weight }); else mergeTraits(scores, { I: weight });
          if (letters[1] === 'S') mergeTraits(scores, { S: weight }); else mergeTraits(scores, { N: weight });
          if (letters[2] === 'T') mergeTraits(scores, { T: weight }); else mergeTraits(scores, { F: weight });
          if (letters[3] === 'J') mergeTraits(scores, { J: weight }); else mergeTraits(scores, { P: weight });
        }
      } catch (err) {
        console.warn('Flask call failed', err.message);
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

    return res.json({ prediction: predicted, scores });
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