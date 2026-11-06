import express from 'express';
import {
  getPublicTestimonials,
  getAllTestimonialsAdmin,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from '../controllers/testimonialController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicTestimonials);
router.get('/admin/all', protectAdmin, getAllTestimonialsAdmin);
router.post('/admin/create', protectAdmin, createTestimonial);
router.put('/admin/:id', protectAdmin, updateTestimonial);
router.delete('/admin/:id', protectAdmin, deleteTestimonial);

export default router;
