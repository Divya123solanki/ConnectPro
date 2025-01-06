import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectDB from './db/Config.js';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
// import { errorHandler } from './middleware/error-handler.js';

import jobRoutes from './routes/job.route.js';

dotenv.config();

const app = express();

// Middleware

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
connectDB();

// Routes
// app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/jobs', jobRoutes);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
