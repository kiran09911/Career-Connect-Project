const express = require('express');
const router = express.Router();
const { getNotifications, markNotificationAsRead, createNotification } = require('../controllers/notificationsController');

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.user = decoded; // Attach user info to request
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }
};

// Routes
router.get('/candidate', authenticateToken, getNotifications); // Fetch notifications for candidate
router.put('/:id/read', authenticateToken, markNotificationAsRead); // Mark notification as read
router.post('/', authenticateToken, createNotification); // Create a new notification (optional)

module.exports = router;