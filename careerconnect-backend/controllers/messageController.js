const pool = require("../models/db");

exports.getOrCreateConversation = async (req, res) => {
  const { user1Id, user2Id, jobId } = req.body;

  if (!user1Id || !user2Id || !jobId) {
    console.error("Missing user1Id, user2Id, or jobId:", { user1Id, user2Id, jobId });
    return res.status(400).json({ message: "Missing user1Id, user2Id, or jobId." });
  }

  try {
    const connection = await pool.getConnection();
    // Convert to numbers for numerical sorting
    const num1 = Number(user1Id);
    const num2 = Number(user2Id);
    // Sort numerically
    let [id1, id2] = [num1, num2].sort((a, b) => a - b);
    // Convert back to strings for consistency with database
    id1 = String(id1);
    id2 = String(id2);

    const [existing] = await connection.query(
      "SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ? AND job_id = ?",
      [id1, id2, jobId]
    );

    let conversationId;
    if (existing.length > 0) {
      conversationId = existing[0].id;
    } else {
      conversationId = `conv-${id1}-${id2}-${jobId}-${Date.now()}`;
      await connection.query(
        "INSERT INTO conversations (id, user1_id, user2_id, job_id) VALUES (?, ?, ?, ?)",
        [conversationId, id1, id2, jobId]
      );
    }

    connection.release();
    console.log("Conversation ID:", { conversationId, user1Id, user2Id, jobId });
    res.json({ conversationId });
  } catch (err) {
    console.error("Error getting/creating conversation:", {
      error: err.message,
      stack: err.stack,
      requestBody: req.body,
    });
    res.status(500).json({ message: "Failed to get or create conversation.", error: err.message });
  }
};

exports.sendMessage = async (req, res) => {
  const { conversationId, senderId, receiverId, content } = req.body;

  if (!conversationId || !senderId || !receiverId || !content) {
    console.error("Missing required fields:", { conversationId, senderId, receiverId, content });
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const connection = await pool.getConnection();
    const [conversation] = await connection.query(
      "SELECT * FROM conversations WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
      [conversationId, senderId, senderId]
    );

    if (conversation.length === 0) {
      connection.release();
      console.error("Invalid conversation or user not authorized:", { conversationId, senderId });
      return res.status(403).json({ message: "Invalid conversation or user not authorized." });
    }

    const [result] = await connection.query(
      "INSERT INTO messages (conversation_id, sender_id, receiver_id, content) VALUES (?, ?, ?, ?)",
      [conversationId, senderId, receiverId, content]
    );
    connection.release();

    const message = {
      id: result.insertId,
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      content,
      created_at: new Date(),
    };

    console.log("Message sent:", message);
    res.status(201).json(message);
  } catch (err) {
    console.error("Error sending message:", {
      error: err.message,
      stack: err.stack,
      requestBody: req.body,
    });
    res.status(500).json({ message: "Failed to send message.", error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const { currentUserId } = req.query;

  if (!conversationId || !currentUserId) {
    console.error("Missing conversationId or currentUserId:", { conversationId, currentUserId });
    return res.status(400).json({ message: "Missing conversationId or currentUserId." });
  }

  try {
    const connection = await pool.getConnection();
    const [conversation] = await connection.query(
      "SELECT * FROM conversations WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
      [conversationId, currentUserId, currentUserId]
    );

    if (conversation.length === 0) {
      connection.release();
      console.error("Conversation not found or user not authorized:", { conversationId, currentUserId });
      return res.status(403).json({ message: "User is not part of this conversation." });
    }

    const [messages] = await connection.query(
      "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
      [conversationId]
    );
    connection.release();

    console.log("Fetched messages:", { conversationId, currentUserId, messageCount: messages.length });
    res.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", {
      error: err.message,
      stack: err.stack,
      conversationId,
      currentUserId,
    });
    res.status(500).json({ message: "Failed to fetch messages.", error: err.message });
  }
};