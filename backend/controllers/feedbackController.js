import { createFeedback, getFeedbacks as getFeedbacksModel } from '../models/feedbackModel.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
const submitFeedback = async (req, res) => {
  const { name, email, message, rating } = req.body;

  try {
    const result = await createFeedback(name, email, message, rating);
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all feedback
// @route   GET /api/feedback
// @access  Admin
const getFeedbacks = async (req, res) => {
    try {
        const feedbacks = await getFeedbacksModel();
        res.json({ success: true, data: feedbacks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export { submitFeedback, getFeedbacks };