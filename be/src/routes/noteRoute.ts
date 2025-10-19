// src/routes/noteRoutes.ts
import express from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import {
    addNote,
    getNotes,
    deleteNote
} from '../controller/noteController';

const router = express.Router();

router.post('/', requireAuth, addNote);
router.get('/', requireAuth, getNotes);
router.delete('/:id', requireAuth, deleteNote); // Optional

export default router;
