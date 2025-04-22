const express = require("express");
const { getMessages, sendMessage } = require("../controllers/messageController");

const router = express.Router();

// Route to fetch all messages for a specific conversation
router.get("/:conversationId", getMessages);

// Send a new message
router.post("/", sendMessage);

module.exports = router;