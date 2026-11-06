import express from 'express';
import { adminLogin, getAdminProfile, updateAdminPassword } from '../controllers/authController.js';
import { protectAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/login', authLimiter, adminLogin);
router.get('/me', protectAdmin, getAdminProfile);
router.put('/change-password', protectAdmin, updateAdminPassword);

export default router;
