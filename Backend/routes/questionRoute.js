// routes/questionRoute.js

const express = require('express');
const { authenticateToken, authenticateAdmin } = require('../middleware/auth');
const Question = require('../models/questionModel');

const router = express.Router();

// Get all questions
router.get('/questions', async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new question
router.post('/Addquestion', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { questionText, category, difficultyLevel, marks } = req.body;

    const question = new Question({
      questionText,
      category,
      difficultyLevel,
      marks,
    });

    await question.save();

    res.status(201).json({ message: 'Question created successfully', question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a question
router.put('/Upquestion/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const { questionText, category, difficultyLevel, marks } = req.body;

    const question = await Question.findByIdAndUpdate(
      req.params.id,
      {
        questionText,
        category,
        difficultyLevel,
        marks,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question updated successfully', question });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a question
router.delete('/delquestion/:id', authenticateToken, authenticateAdmin, async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// Get question text by ID
router.get('/question/:id', async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      return res.status(404).json({ error: 'Question not found' });
    }

    res.json({ questionText: question.questionText });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
