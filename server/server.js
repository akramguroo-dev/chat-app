const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    methods: ['GET', 'POST']
  }
});

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/chat-app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Routes (for health check)
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Socket.io Connection
io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  // User joins a room
  socket.on('joinRoom', (roomName, userName) => {
    socket.join(roomName);
    console.log(`${userName} joined room: ${roomName}`);
 
    // Tell everyone in room that user joined
    socket.to(roomName).emit('userJoined', {
      userName: userName,
      message: `${userName} joined the chat`
    });
  });

  // User sends a message
  socket.on('sendMessage', (roomName, messageData) => {
    console.log(`Message in ${roomName}:`, messageData);
    
    // Broadcast to everyone in the room
    io.to(roomName).emit('receiveMessage', messageData);
  });

  // User leaves room
  socket.on('leaveRoom', (roomName, userName) => {
    socket.leave(roomName);
    console.log(`${userName} left room: ${roomName}`);
    
    // Tell everyone in room that user left
    socket.to(roomName).emit('userLeft', {
      userName: userName,
      message: `${userName} left the chat`
    });
  });

  // User disconnects
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});