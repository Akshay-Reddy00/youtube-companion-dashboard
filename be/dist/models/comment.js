"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const commentSchema = new mongoose_1.default.Schema({
    videoId: { type: String, required: true }, // Refers to the YouTube video
    parentId: { type: mongoose_1.default.Schema.Types.ObjectId, default: null },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
exports.Comment = mongoose_1.default.model('Comment', commentSchema);
