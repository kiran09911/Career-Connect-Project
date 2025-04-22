const pool = require("../models/db");

// Fetch messages for a conversation
// exports.getMessages = async (req, res) => {
//   const { conversationId } = req.params;

//   try {
//     const connection = await pool.getConnection();
//     const [messages] = await connection.query(
//       "SELECT * FROM messages WHERE conversation_id = ? ORDER BY created_at ASC",
//       [conversationId]
//     );
//     connection.release();

    
//     res.json(messages);
//   } catch (err) {
//     console.error("Error fetching messages:", err);
//     res.status(500).json({ message: "Failed to fetch messages." });
//   }
// };

// Fetch messages for a conversation
exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;
  const { currentUserId } = req.query; // You can pass this via query params or headers

  try {
    const connection = await pool.getConnection();
    const [messages] = await connection.query(
      "SELECT * FROM messages WHERE conversation_id = ? AND (sender_id = ? OR receiver_id = ?) ORDER BY created_at ASC",
      [conversationId, currentUserId, currentUserId]
    );
    connection.release();

    res.json(messages);
    console.log("Fetching messages for conversation:", conversationId);
console.log("Current user ID from query:", currentUserId);
console.log("Fetched messages from DB:", messages);

  } catch (err) {
    console.error("Error fetching messages:", err);
    res.status(500).json({ message: "Failed to fetch messages." });
  }
};


// Send a new message
exports.sendMessage = async (req, res) => {
  const { conversationId, senderId, receiverId, content } = req.body;

  if (!conversationId || !senderId || !receiverId || !content) {
    return res.status(400).json({ message: "Missing required fields." });
  }

  try {
    const connection = await pool.getConnection();
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

    res.status(201).json(message);
  } catch (err) {
    console.error("Error sending message:", err);
    res.status(500).json({ message: "Failed to send message." });
  }
};
