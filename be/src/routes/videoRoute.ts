import express from 'express';
const router = express.Router();
import { requireAuth } from '../middleware/authMiddleware';
import { getVideo, addVideo, updateVideo } from '../controller/videoController';

router.get('/:id', requireAuth, getVideo);         // Get video details
router.post('/', requireAuth, addVideo);           // Add a new video
router.put('/:id', requireAuth, updateVideo);      // Update title/description

export default router;