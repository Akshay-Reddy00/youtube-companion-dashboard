"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComments = exports.deleteComment = exports.addComment = void 0;
const comment_1 = require("../models/comment");
// POST /comments - Add comment or reply
const addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, parentId, text } = req.body;
        const comment = new comment_1.Comment({ videoId, parentId: parentId || null, text });
        yield comment.save();
        res.status(201).json(comment);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.addComment = addComment;
// DELETE /comments/:id
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // Delete the comment
        yield comment_1.Comment.findByIdAndDelete(id);
        // Delete replies (nested)
        yield comment_1.Comment.deleteMany({ parentId: id });
        res.json({ message: 'Comment and replies deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.deleteComment = deleteComment;
// GET /comments/:videoId - Get all comments + replies
const getComments = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId } = req.params;
        const comments = yield comment_1.Comment.find({ videoId }).sort({ createdAt: -1 });
        res.json(comments);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getComments = getComments;
