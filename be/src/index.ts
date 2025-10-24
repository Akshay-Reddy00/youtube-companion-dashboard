import express from "express";
import cors from "cors";
import { dbConnect, validateEnv } from "./config/db";
import authRoutes from './routes/authRoute';
import videoRoutes from './routes/videoRoute';
import commentRoutes from './routes/commentRoute';
import noteRoutes from './routes/noteRoute';

const app = express();
const allowedOrigin = ["https://youtube-companion-dashboard-three.vercel.app", "https://ytdash.akshayreddy.work", "http://localhost:5173"]
app.use(cors({
    origin: allowedOrigin, // add frontend's endpoint in .env file
    credentials: true
}));
app.use(express.json());
dbConnect();
validateEnv();

app.get("/", (req, res) => {
    res.send("Youtube Dashboard API is running");
});

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/notes', noteRoutes);

app.listen(3000);
