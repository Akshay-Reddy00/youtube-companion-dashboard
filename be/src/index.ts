import express from "express";
import cors from "cors";
import { dbConnect, validateEnv } from "./config/db";
import authRoutes from './routes/authRoute';
import videoRoutes from './routes/videoRoute';
import commentRoutes from './routes/commentRoute';
import noteRoutes from './routes/noteRoute';

const app = express();
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN, // add frontend's endpoint in .env file
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
