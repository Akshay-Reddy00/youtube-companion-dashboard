// src/routes/commentRoutes.ts
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import {
    addComment,
    deleteComment,
    getComments
} from '../controller/commentController';

const router = express.Router();

router.post('/', requireAuth, addComment);
router.delete('/:id', requireAuth, deleteComment);
router.get('/:videoId', requireAuth, getComments);

export default router;
