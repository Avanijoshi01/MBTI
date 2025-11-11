const express = require('express');
const router = express.Router();
const questions = require('../questions.json');

router.get('/start', (req, res) => {
  res.json({ question: questions['start'] });
});

// Get question by id
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const q = questions[id];
  if (!q) return res.status(404).json({ error: 'Question not found' });
  res.json({ question: q });
});

module.exports = router;