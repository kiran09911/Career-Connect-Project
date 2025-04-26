const express = require("express");
const router = express.Router();
const { getMessages, sendMessage, getOrCreateConversation } = require("../controllers/messageController");

router.post("/conversations", getOrCreateConversation);

router.get("/messages/:conversationId", getMessages);
router.post("/messages", sendMessage);

module.exports = router;