const express = require('express');
const { getUserById } = require('../controllers/userController'); 
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch user profile
router.get('/', authenticateToken, getUserById);


module.exports = router;