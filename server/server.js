const roomRoutes = require('./routes/roomRoutes');
const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const config = require('config');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./utils/logger');
const noteRoutes = require('./routes/noteRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const { initSocket } = require('./socket/socketManager'); 
const errorHandler = require('./middleware/errorHandler');

const app = express();

// Middleware setup
app.use(express.json());
app.use(cors());

// API routes
app.use('/api/notes', noteRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);

// Global error handling middleware
app.use(errorHandler);

// Create HTTP server instance
const server = http.createServer(app);

// Initialize Socket.io and attach to HTTP server
const io = socketio(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

// Initialize all Socket.io events and handlers
initSocket(io);

// Connect to MongoDB
const dbURI = config.get('mongoURI');
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logger.info('MongoDB connected'))
  .catch(err => logger.error('MongoDB connection error:', err));

// Start the server
const PORT = process.env.PORT || config.get('port') || 5000;
server.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
