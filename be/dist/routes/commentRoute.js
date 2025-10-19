"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/commentRoutes.ts
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const commentController_1 = require("../controller/commentController");
const router = express_1.default.Router();
router.post('/', authMiddleware_1.requireAuth, commentController_1.addComment);
router.delete('/:id', authMiddleware_1.requireAuth, commentController_1.deleteComment);
router.get('/:videoId', authMiddleware_1.requireAuth, commentController_1.getComments);
exports.default = router;
