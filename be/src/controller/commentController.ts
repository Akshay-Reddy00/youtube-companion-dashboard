import { Request, Response } from 'express';
import { Comment } from '../models/comment';

// POST /comments - Add comment or reply
export const addComment = async (req: Request, res: Response) => {
    try {
        const { videoId, parentId, text } = req.body;

        const comment = new Comment({ videoId, parentId: parentId || null, text });
        await comment.save();

        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// DELETE /comments/:id
export const deleteComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Delete the comment
        await Comment.findByIdAndDelete(id);

        // Delete replies (nested)
        await Comment.deleteMany({ parentId: id });

        res.json({ message: 'Comment and replies deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// GET /comments/:videoId - Get all comments + replies
export const getComments = async (req: Request, res: Response) => {
    try {
        const { videoId } = req.params;

        const comments = await Comment.find({ videoId }).sort({ createdAt: -1 });

        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
