"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Video = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const videoSchema = new mongoose_1.default.Schema({
    videoId: { type: String, required: true }, // YouTube ID
    title: String,
    description: String,
    createdAt: { type: Date, default: Date.now }
});
exports.Video = mongoose_1.default.model('Video', videoSchema);
