// src/controllers/videoController.ts
import { Request, Response } from 'express';
import axios from "axios";
import { Video } from '../models/video';

interface YoutubeResponse {
    title: string;
    author_name: string;
    thumbnail_url: string;
    html: string;

}

export const getPublicVideoDetails = async (req: Request, res: Response) => {
    try {
        const {url} = req.query;
        if(!url || typeof url !== 'string') {
            return res.status(400).json({
                message: "Youtube url is required"
            })
        }

        const embedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format='json`;
        const response = await axios.get<YoutubeResponse>(embedUrl);
        const data = response.data;

        const videoIdMatch = url.match(/v=([^&]+)/);
        const videoId = videoIdMatch ? videoIdMatch[1] : null;

        if(videoId) {
            await Video.findOneAndUpdate( {videoId}, {title: data.title, description: data.author_name});
        }

        res.status(200).json({
            videoId,
            title: data.title,
            author: data.author_name,
            thumbnail: data.thumbnail_url,
            embedHtml: data.html,
            videoUrl: url
        })
    } catch(err: any) {
        res.status(500).json({message: 'Failed to fetch video details'});
    }
}

// GET /videos - Get all videos
export const getVideos = async (req: Request, res: Response) => {
    try {
        const videos = await Video.find();
        res.json(videos);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

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
