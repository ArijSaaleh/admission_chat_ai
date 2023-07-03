const router = require("express").Router();
const Interview = require("../models/interviewModel");
const User = require("../models/userModel")
const { authenticateToken } = require("../middleware/auth");
const Question = require('../models/questionModel');
// Protected route for starting an interview
router.post('/interview/start', authenticateToken, async (req, res) => {
    try {
        // Access the authenticated user from req.user
        const userId = req.user._id;

        // Find the user by userId to verify if the user is a candidate
        const user = await User.findById(userId);

        // If the user is not found or is not a candidate, return an error
        if (!user || user.role !== 'candidate') {
            return res.status(401).json({ error: 'Only candidates are allowed to take interviews' });
        }
        // Check if the user has already passed the interview
        if (user.passedInterview) {
            return res.status(400).json({ error: 'You have already passed the interview' });
        }

        // Retrieve the questions from the database
        const questions = await Question.find().lean();

        // Create an interview object
        const interview = new Interview({
            candidate: userId,
            questions: questions.map(question => ({
                question: question._id, // Assuming question._id is the ObjectId
                answer: '', // Initialize the answer with an empty string
            })),
        });
        // Save the interview object
        await interview.save();

        res.json({ message: 'Interview started successfully', questions: questions.map(q => q.questionText) });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Submit interview route
router.post('/submit', authenticateToken, async (req, res) => {
    try {
        // Access the authenticated user from req.user
        const userId = req.user._id;

        // Retrieve the interview for the candidate
        const interview = await Interview.findOne({ candidate: userId });

        // If the interview doesn't exist or has already been submitted, return an error
        if (!interview || interview.submitted) {
            return res.status(400).json({ error: 'No interview found or interview already submitted' });
        }

        // Get the answers from the request body
        const { answers } = req.body;

        // Update the interview with the candidate's answers
        interview.questions.forEach((question, index) => {
            question.answer = answers[index];
        });

        // Mark the interview as submitted
        interview.submitted = true;

        // Save the updated interview to the database
        await interview.save();

        // Update the user's passedInterview flag to true
        await User.findByIdAndUpdate(userId, { passedInterview: true });

        res.json({ message: 'Interview submitted successfully', interview: interview });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET /api/admission/interview/:userId
router.get('/interview/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Retrieve the interview based on the user ID
        const interview = await Interview.findOne({ candidate: userId })
            .populate('candidate', 'name') // Populate the candidate field with the user's name
            .populate('questions.question', 'text'); // Populate the questions field with the question text

        if (!interview) {
            return res.status(404).json({ error: 'Interview not found' });
        }

        res.json(interview);
    } catch (error) {
        console.error('Error retrieving interview:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;

module.exports = router;
