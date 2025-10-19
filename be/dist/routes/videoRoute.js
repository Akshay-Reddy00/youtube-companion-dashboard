"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const authMiddleware_1 = require("../middleware/authMiddleware");
const videoController_1 = require("../controller/videoController");
router.get('/:id', authMiddleware_1.requireAuth, videoController_1.getVideo); // Get video details
router.post('/', authMiddleware_1.requireAuth, videoController_1.addVideo); // Add a new video
router.put('/:id', authMiddleware_1.requireAuth, videoController_1.updateVideo); // Update title/description
exports.default = router;
