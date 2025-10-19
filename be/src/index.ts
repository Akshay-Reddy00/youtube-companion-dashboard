import express from "express";
import cors from "cors";
import { dbConnect } from "./config/db";
import authRoutes from './routes/authRoute';
import videoRoutes from './routes/videoRoute';
import commentRoutes from './routes/commentRoute';
import noteRoutes from './routes/noteRoute';

const app = express();
app.use(cors());
app.use(express.json());
dbConnect();

app.get("/", (req, res) => {
    res.send("Youtube Dashboard API is running");
});

app.use('/auth', authRoutes);
app.use('/videos', videoRoutes);
app.use('/comments', commentRoutes);
app.use('/notes', noteRoutes);

app.listen(3000);