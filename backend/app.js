import express from 'express';
import http from 'http';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/dbConnection.js';
import initializeSocket from './config/socket.js';
import messageRoutes from './Routes/message.routes.js';
import conversationRoutes from './Routes/conversation.routes.js';
import UserRouter from "./routes/user.router.js";
import makeuserprofile from "./routes/profile.router.js";

import jobRoutes from './routes/job.route.js';


dotenv.config();
const app = express();
const server = http.createServer(app);

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user",UserRouter);
app.use("/profile",makeuserprofile);

app.use('/api/jobs', jobRoutes);

// Database Connection
connectDB();

// Routes
app.use('/api/conversations', conversationRoutes);
app.use('/api/messages', messageRoutes);

// Initialize Socket.IO
const io = initializeSocket(server);
app.set('socketio', io);

server.listen(3000, () => {
  console.log(`Server running`);
});


