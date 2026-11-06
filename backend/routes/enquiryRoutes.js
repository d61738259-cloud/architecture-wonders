import express from 'express';
import {
  submitEnquiry,
  getEnquiries,
  updateEnquiryStatus,
  addEnquiryNote,
  deleteEnquiry,
} from '../controllers/enquiryController.js';
import { protectAdmin } from '../middleware/auth.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

// Public submission
router.post('/submit', enquiryLimiter, submitEnquiry);

// Admin management
router.get('/admin/all', protectAdmin, getEnquiries);
router.patch('/admin/:id/status', protectAdmin, updateEnquiryStatus);
router.post('/admin/:id/notes', protectAdmin, addEnquiryNote);
router.delete('/admin/:id', protectAdmin, deleteEnquiry);

export default router;
