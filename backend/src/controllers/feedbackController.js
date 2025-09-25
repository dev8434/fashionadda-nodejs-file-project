import Feedback from '../models/feedbackModel.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Public
const submitFeedback = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const feedback = await Feedback.create({
      name,
      email,
      message,
    });

    res.status(201).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export { submitFeedback };
