import express from "express";
import cors from "cors";
import { dbConnect, validateEnv } from "./config/db";
import authRoutes from './routes/authRoute';
import videoRoutes from './routes/videoRoute';
import commentRoutes from './routes/commentRoute';
import noteRoutes from './routes/noteRoute';

const app = express();
const allowedOrigin = ["https://youtube-companion-dashboard-two.vercel.app/", "http://localhost:5173"]
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

// only for dev
// app.listen(3000);

// Vercel expects a serverless function handler
export default app;
