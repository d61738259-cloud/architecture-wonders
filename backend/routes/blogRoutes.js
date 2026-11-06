import express from 'express';
import {
  getPublicArticles,
  getArticleBySlug,
  getAllArticlesAdmin,
  createArticle,
  updateArticle,
  deleteArticle,
} from '../controllers/blogController.js';
import { protectAdmin } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getPublicArticles);
router.get('/slug/:slug', getArticleBySlug);

router.get('/admin/all', protectAdmin, getAllArticlesAdmin);
router.post('/admin/create', protectAdmin, createArticle);
router.put('/admin/:id', protectAdmin, updateArticle);
router.delete('/admin/:id', protectAdmin, deleteArticle);

export default router;
