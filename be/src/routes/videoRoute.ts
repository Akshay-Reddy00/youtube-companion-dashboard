import express from 'express';
const router = express.Router();
import { requireAuth } from '../middleware/authMiddleware';
import { getVideos, getVideo, addVideo, updateVideo, getPublicVideoDetails } from '../controller/videoController';

router.get('/public/details', requireAuth, getPublicVideoDetails)
router.get('/', requireAuth, getVideos);           // Get all videos
router.get('/:id', requireAuth, getVideo);         // Get video details
router.post('/', requireAuth, addVideo);           // Add a new video
router.put('/:id', requireAuth, updateVideo);      // Update title/description

export default router;