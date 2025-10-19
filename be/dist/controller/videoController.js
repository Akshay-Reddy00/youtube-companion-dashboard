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
exports.updateVideo = exports.addVideo = exports.getVideo = void 0;
const video_1 = require("../models/video");
// GET /videos/:id - Get video details
const getVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const video = yield video_1.Video.findOne({ videoId: req.params.id });
        if (!video)
            return res.status(404).json({ message: 'Video not found' });
        res.json(video);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getVideo = getVideo;
// POST /videos - Add a new video
const addVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, title, description } = req.body;
        const video = new video_1.Video({ videoId, title, description });
        yield video.save();
        res.status(201).json(video);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.addVideo = addVideo;
// PUT /videos/:id - Update title or description
const updateVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const updated = yield video_1.Video.findOneAndUpdate({ videoId: req.params.id }, { title, description }, { new: true });
        if (!updated)
            return res.status(404).json({ message: 'Video not found' });
        res.json(updated);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.updateVideo = updateVideo;
