// userRoutes.js
const express = require('express');
const { getUserById } = require('../controllers/userController'); // Ensure this matches the export in userController.js
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch user profile
router.get('/', authenticateToken, getUserById);

module.exports = router;