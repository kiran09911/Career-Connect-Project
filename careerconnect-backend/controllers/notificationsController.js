const pool = require('../models/db');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Fetch notifications for a specific user (e.g., candidate)
exports.getNotifications = async (req, res) => {
  try {
    const userId = req.user.id; // From JWT
    const role = req.user.role;

    const connection = await pool.getConnection();
    const [notifications] = await connection.query(
      'SELECT * FROM notifications WHERE user_id = ? AND role = ? ORDER BY created_at DESC',
      [userId, role]
    );
    connection.release();

    res.status(200).json(notifications);
  } catch (err) {
    console.error('Error fetching notifications:', err);
    res.status(500).json({ message: 'Server error while fetching notifications' });
  }
};

// Mark a notification as read
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notificationId = req.params.id;
    const userId = req.user.id;
    const role = req.user.role;

    const connection = await pool.getConnection();
    const [notifications] = await connection.query(
      'SELECT * FROM notifications WHERE id = ? AND user_id = ? AND role = ?',
      [notificationId, userId, role]
    );

    if (notifications.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'Notification not found or access denied' });
    }

    await connection.query(
      'UPDATE notifications SET is_read = true, updated_at = NOW() WHERE id = ?',
      [notificationId]
    );
    connection.release();

    res.status(200).json({ message: 'Notification marked as read' });
  } catch (err) {
    console.error('Error marking notification as read:', err);
    res.status(500).json({ message: 'Server error while marking notification as read' });
  }
};

// (Optional) Create a new notification (e.g., when a candidate applies for a job)
exports.createNotification = async (req, res) => {
  try {
    const { userId, role, message } = req.body;
    if (!userId || !role || !message) {
      return res.status(400).json({ message: 'userId, role, and message are required' });
    }

    const notificationId = `application-${Math.floor(Math.random() * 100)}-${Date.now()}`; // Generate unique ID
    const connection = await pool.getConnection();
    await connection.query(
      'INSERT INTO notifications (id, user_id, role, message) VALUES (?, ?, ?, ?)',
      [notificationId, userId, role, message]
    );
    connection.release();

    res.status(201).json({ message: 'Notification created', notificationId });
  } catch (err) {
    console.error('Error creating notification:', err);
    res.status(500).json({ message: 'Server error while creating notification' });
  }
};