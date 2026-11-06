import express from 'express';
import {
  getWebsiteSettings,
  updateWebsiteSettings,
  getDashboardStats,
} from '../controllers/contentController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/settings', getWebsiteSettings);
router.put('/admin/settings', protectAdmin, updateWebsiteSettings);
router.get('/admin/stats', protectAdmin, getDashboardStats);

export default router;
