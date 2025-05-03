const express = require("express");
const app = express();
const router = express.Router();
const { getMessages, sendMessage, getOrCreateConversation } = require("../controllers/messageController");

app.use(express.json());
app.use("/uploads", express.static("uploads"));

router.post("/conversations", getOrCreateConversation);

router.get("/messages/:conversationId", getMessages);
router.post("/messages", sendMessage);

module.exports = router;