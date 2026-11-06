import express from 'express';
import {
  getCalculatorSettings,
  calculateEstimate,
  getAdminCalculatorConfig,
  updateCalculatorSettings,
  createCalculatorService,
  updateCalculatorService,
  deleteCalculatorService,
} from '../controllers/calculatorController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public
router.get('/settings', getCalculatorSettings);
router.post('/calculate', calculateEstimate);

// Admin
router.get('/admin/config', protectAdmin, getAdminCalculatorConfig);
router.put('/admin/settings', protectAdmin, updateCalculatorSettings);
router.post('/admin/services', protectAdmin, createCalculatorService);
router.put('/admin/services/:id', protectAdmin, updateCalculatorService);
router.delete('/admin/services/:id', protectAdmin, deleteCalculatorService);

export default router;
