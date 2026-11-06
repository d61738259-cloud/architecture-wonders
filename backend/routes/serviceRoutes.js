import express from 'express';
import {
  getServices,
  getServiceBySlug,
  getAllServicesAdmin,
  createService,
  updateService,
  deleteService,
} from '../controllers/serviceController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getServices);
router.get('/slug/:slug', getServiceBySlug);

router.get('/admin/all', protectAdmin, getAllServicesAdmin);
router.post('/admin/create', protectAdmin, createService);
router.put('/admin/:id', protectAdmin, updateService);
router.delete('/admin/:id', protectAdmin, deleteService);

export default router;
