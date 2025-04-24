// const express = require("express");
// const { getMessages, sendMessage, getOrCreateConversation } = require("../controllers/messageController");

// const router = express.Router();

// // Route to fetch all messages for a specific conversation
// // router.get("/:conversationId", getMessages);
// router.get('/messages/:conversationId', getMessages);
// // Send a new message
// router.post("/messages", sendMessage);

// router.post("/conversations", getOrCreateConversation);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { getMessages, sendMessage, getOrCreateConversation } = require("../controllers/messageController");

router.post("/conversations", getOrCreateConversation);

router.get("/messages/:conversationId", getMessages);
router.post("/messages", sendMessage);

module.exports = router;