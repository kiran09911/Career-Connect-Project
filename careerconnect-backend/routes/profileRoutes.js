const express = require('express');
const { getUserProfile, updateProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Route to get the authenticated user's profile
router.get('/', authenticateToken, getUserProfile);

// Route to update the authenticated user's profile
router.put('/', authenticateToken, updateProfile);

module.exports = router;