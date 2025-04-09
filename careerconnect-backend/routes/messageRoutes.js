const express = require('express');
const { getMessages, sendMessage } = require('../controllers/messageController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:conversationId', authenticateToken, getMessages);
router.post('/', authenticateToken, sendMessage);

module.exports = router;