// src/controllers/noteController.ts
import { Request, Response } from 'express';
import { Note } from '../models/note';

// POST /notes - Add a note
export const addNote = async (req: Request, res: Response) => {
    try {
        const { videoId, text, tags } = req.body;
        const note = new Note({ videoId, text, tags });
        await note.save();
        res.status(201).json(note);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// GET /notes?videoId=xyz&tag=abc
export const getNotes = async (req: Request, res: Response) => {
    try {
        const { videoId, tag } = req.query;

        if (!videoId) {
            return res.status(400).json({ message: 'videoId is required' });
        }

        const filter: any = { videoId };

        if (tag) {
            filter.tags = tag;
        }

        const notes = await Note.find(filter).sort({ createdAt: -1 });

        res.json(notes);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// (Optional) DELETE /notes/:id
export const deleteNote = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Note.findByIdAndDelete(id);
        res.json({ message: 'Note deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
