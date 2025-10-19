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
exports.deleteNote = exports.getNotes = exports.addNote = void 0;
const note_1 = require("../models/note");
// POST /notes - Add a note
const addNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, text, tags } = req.body;
        const note = new note_1.Note({ videoId, text, tags });
        yield note.save();
        res.status(201).json(note);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.addNote = addNote;
// GET /notes?videoId=xyz&tag=abc
const getNotes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { videoId, tag } = req.query;
        if (!videoId) {
            return res.status(400).json({ message: 'videoId is required' });
        }
        const filter = { videoId };
        if (tag) {
            filter.tags = tag;
        }
        const notes = yield note_1.Note.find(filter).sort({ createdAt: -1 });
        res.json(notes);
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.getNotes = getNotes;
// (Optional) DELETE /notes/:id
const deleteNote = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield note_1.Note.findByIdAndDelete(id);
        res.json({ message: 'Note deleted' });
    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
});
exports.deleteNote = deleteNote;
