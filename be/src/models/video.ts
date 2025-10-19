import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    videoId: { type: String, required: true }, // YouTube ID
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});

export const Video = mongoose.model('Video', videoSchema);