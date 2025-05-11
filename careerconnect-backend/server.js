require('dotenv').config();
const express = require('express');
const http = require("http");
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const messageRoutes = require('./routes/messageRoutes');
const userRoutes = require('./routes/userRoutes');
const { initializeSocket } = require("./utils/socket");

const app = express();
const PORT = process.env.PORT || 5000;
const server = http.createServer(app); // Create an HTTP server

 // Initialize Socket.IO
initializeSocket(server);

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api', applicationRoutes);
app.use('/api', profileRoutes);
app.use('/api', messageRoutes);
app.use('/api/user', userRoutes);


// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});