// src/controllers/videoController.ts
import { Request, Response } from 'express';
import { Video } from '../models/video';

// GET /videos/:id - Get video details
export const getVideo = async (req: Request, res: Response) => {
    try {
        const video = await Video.findOne({ videoId: req.params.id });
        if (!video) return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// POST /videos - Add a new video
export const addVideo = async (req: Request, res: Response) => {
    try {
        const { videoId, title, description } = req.body;
        const video = new Video({ videoId, title, description });
        await video.save();
        res.status(201).json(video);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// PUT /videos/:id - Update title or description
export const updateVideo = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const updated = await Video.findOneAndUpdate(
            { videoId: req.params.id },
            { title, description },
            { new: true }
        );
        if (!updated) return res.status(404).json({ message: 'Video not found' });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
