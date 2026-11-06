import express from 'express';
import { uploadMedia, getMediaList, deleteMedia } from '../controllers/mediaController.js';
import { protectAdmin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.post('/upload', protectAdmin, upload.single('image'), uploadMedia);
router.get('/', protectAdmin, getMediaList);
router.delete('/:id', protectAdmin, deleteMedia);

export default router;
