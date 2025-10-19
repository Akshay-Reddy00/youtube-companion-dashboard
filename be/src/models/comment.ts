import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
    videoId: { type: String, required: true },  // Refers to the YouTube video
    parentId: { type: mongoose.Schema.Types.ObjectId, default: null },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model('Comment', commentSchema);