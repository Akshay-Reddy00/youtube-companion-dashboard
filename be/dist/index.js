"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const authRoute_1 = __importDefault(require("./routes/authRoute"));
const videoRoute_1 = __importDefault(require("./routes/videoRoute"));
const commentRoute_1 = __importDefault(require("./routes/commentRoute"));
const noteRoute_1 = __importDefault(require("./routes/noteRoute"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
(0, db_1.dbConnect)();
app.get("/", (req, res) => {
    res.send("Youtube Dashboard API is running");
});
app.use('/auth', authRoute_1.default);
app.use('/videos', videoRoute_1.default);
app.use('/comments', commentRoute_1.default);
app.use('/notes', noteRoute_1.default);
app.listen(3000);
