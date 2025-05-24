const pool = require("../models/db");
const multer = require("multer");
const path = require("path");

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Store files in the uploads/ directory
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /pdf|doc|docx/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error("Only PDF and Word documents are allowed!"));
    }
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
}).single("document");

exports.getOrCreateConversation = async (req, res) => {
  const { user1Id, user2Id, jobId } = req.body;

  if (!user1Id || !user2Id || !jobId) {
    console.error("Missing user1Id, user2Id, or jobId:", { user1Id, user2Id, jobId });
    return res.status(400).json({ message: "Missing user1Id, user2Id, or jobId." });
  }

  try {
    const connection = await pool.getConnection();
    try {
      // Check if there is an accepted application for this job and candidate-recruiter pair
      const [application] = await connection.query(
        "SELECT * FROM applications WHERE job_id = ? AND candidate_id = ? AND recruiter_id = ? AND status = 'accepted'",
        [jobId, user1Id, user2Id]
      );

      const [applicationReverse] = await connection.query(
        "SELECT * FROM applications WHERE job_id = ? AND candidate_id = ? AND recruiter_id = ? AND status = 'accepted'",
        [jobId, user2Id, user1Id]
      );

      if (application.length === 0 && applicationReverse.length === 0) {
        console.error("Chat not allowed: No accepted application", { jobId, user1Id, user2Id });
        return res.status(403).json({ message: "Chat is only available after the application is accepted." });
      }

      // Normalize user IDs to ensure consistent conversation ID
      const num1 = Number(user1Id);
      const num2 = Number(user2Id);
      let [id1, id2] = [num1, num2].sort((a, b) => a - b);
      id1 = String(id1);
      id2 = String(id2);

      // Check for existing conversation
      const [existing] = await connection.query(
        "SELECT id FROM conversations WHERE user1_id = ? AND user2_id = ? AND job_id = ?",
        [id1, id2, jobId]
      );

      let conversationId;
      if (existing.length > 0) {
        conversationId = existing[0].id;
      } else {
        // Create new conversation
        conversationId = `conv-${id1}-${id2}-${jobId}-${Date.now()}`;
        await connection.query(
          "INSERT INTO conversations (id, user1_id, user2_id, job_id) VALUES (?, ?, ?, ?)",
          [conversationId, id1, id2, jobId]
        );
      }

      console.log("Conversation ID:", { conversationId, user1Id, user2Id, jobId });
      res.json({ conversationId });
    } finally {
      connection.release();
    }
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
  upload(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err.message);
      return res.status(400).json({ message: err.message });
    }

    const { conversationId, senderId, receiverId, content } = req.body;
    const documentUrl = req.file ? `/uploads/${req.file.filename}` : null;

    if (!conversationId || !senderId || !receiverId) {
      console.error("Missing required fields:", { conversationId, senderId, receiverId, content, documentUrl });
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (!content && !documentUrl) {
      console.error("No content or document provided:", { conversationId, senderId, receiverId });
      return res.status(400).json({ message: "Either content or a document is required." });
    }

    try {
      const connection = await pool.getConnection();
      try {
        // Verify the user is part of the conversation
        const [conversation] = await connection.query(
          "SELECT * FROM conversations WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
          [conversationId, senderId, senderId]
        );

        if (conversation.length === 0) {
          console.error("Invalid conversation or user not authorized:", { conversationId, senderId });
          return res.status(403).json({ message: "Invalid conversation or user not authorized." });
        }

        // Insert the message with document_url
        const [result] = await connection.query(
          "INSERT INTO messages (conversation_id, sender_id, receiver_id, content, document_url) VALUES (?, ?, ?, ?, ?)",
          [conversationId, senderId, receiverId, content || null, documentUrl]
        );

        const message = {
          id: result.insertId,
          conversation_id: conversationId,
          sender_id: senderId,
          receiver_id: receiverId,
          content: content || null,
          document_url: documentUrl,
          created_at: new Date(),
        };

        console.log("Message sent:", message);
        res.status(201).json(message);
      } finally {
        connection.release();
      }
    } catch (err) {
      console.error("Error sending message:", {
        error: err.message,
        stack: err.stack,
        requestBody: req.body,
      });
      res.status(500).json({ message: "Failed to send message.", error: err.message });
    }
  });
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
    try {
      // Verify the user is part of the conversation
      const [conversation] = await connection.query(
        "SELECT * FROM conversations WHERE id = ? AND (user1_id = ? OR user2_id = ?)",
        [conversationId, currentUserId, currentUserId]
      );

      if (conversation.length === 0) {
        console.error("Conversation not found or user not authorized:", { conversationId, currentUserId });
        return res.status(403).json({ message: "User is not part of this conversation." });
      }

      // Fetch messages
      const [messages] = await connection.query(
        "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
        [conversationId]
      );

      console.log("Fetched messages:", { conversationId, currentUserId, messageCount: messages.length });
      res.json(messages);
    } finally {
      connection.release();
    }
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



exports.getMessageCount = async (req, res) => {
  const { user1Id, user2Id, jobId } = req.params;

  if (!user1Id || !user2Id || !jobId) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    const connection = await pool.getConnection();
    try {
      // Find conversation between users for this job
      const [conversations] = await connection.query(
        `SELECT id FROM conversations 
         WHERE ((user1_id = ? AND user2_id = ?) 
                OR (user1_id = ? AND user2_id = ?))
           AND job_id = ?`,
        [user1Id, user2Id, user2Id, user1Id, jobId]
      );

      if (conversations.length === 0) {
        return res.json({ count: 0 });
      }

      // Get message count for the found conversation
      const [countResult] = await connection.query(
        `SELECT COUNT(*) AS messageCount 
         FROM messages 
         WHERE conversation_id = ?`,
        [conversations[0].id]
      );

      res.json({ count: countResult[0].messageCount });
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error("Error getting message count:", {
      error: err.message,
      stack: err.stack,
      params: req.params
    });
    res.status(500).json({ message: "Failed to get message count", error: err.message });
  }
};

