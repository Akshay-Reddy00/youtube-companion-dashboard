import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    videoId: { type: String, required: true },
    text: { type: String, required: true },
    tags: [String],
    createdAt: { type: Date, default: Date.now }
});

export const Note = mongoose.model('Note', noteSchema);