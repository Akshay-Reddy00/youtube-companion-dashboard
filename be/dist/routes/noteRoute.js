"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/noteRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const noteController_1 = require("../controller/noteController");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.requireAuth, noteController_1.addNote);
router.get('/', authMiddleware_1.requireAuth, noteController_1.getNotes);
router.delete('/:id', authMiddleware_1.requireAuth, noteController_1.deleteNote); // Optional
exports.default = router;
