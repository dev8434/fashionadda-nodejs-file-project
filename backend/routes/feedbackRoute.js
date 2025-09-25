import express from 'express';
import { submitFeedback, getFeedbacks } from '../controllers/feedbackController.js';
import adminAuth from '../middleware/adminAuth.js';

const router = express.Router();

router.post('/', submitFeedback);
router.get('/', adminAuth, getFeedbacks);

export default router;
