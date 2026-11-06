import express from 'express';
import {
  getProjects,
  getProjectBySlug,
  getAllProjectsAdmin,
  createProject,
  updateProject,
  deleteProject,
} from '../controllers/projectController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/', getProjects);
router.get('/slug/:slug', getProjectBySlug);

// Admin routes
router.get('/admin/all', protectAdmin, getAllProjectsAdmin);
router.post('/admin/create', protectAdmin, createProject);
router.put('/admin/:id', protectAdmin, updateProject);
router.delete('/admin/:id', protectAdmin, deleteProject);

export default router;
