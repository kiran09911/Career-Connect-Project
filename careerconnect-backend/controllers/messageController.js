const pool = require('../models/db');

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const connection = await pool.getConnection();

    const [messages] = await connection.query(
      `SELECT m.*, u.name as sender_name
       FROM messages m
       JOIN users u ON m.sender_id = u.id
       WHERE m.conversation_id = ?
       ORDER BY m.created_at ASC`,
      [conversationId]
    );

    connection.release();
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    res.status(500).json({ error: 'Database error' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, content } = req.body;
    const senderId = req.user.id;

    const connection = await pool.getConnection();

    // Fetch the receiver_id from the conversation
    const [conversation] = await connection.query(
      'SELECT user1_id, user2_id FROM conversations WHERE id = ?',
      [conversationId]
    );

    if (conversation.length === 0) {
      connection.release();
      return res.status(404).json({ error: 'Conversation not found' });
    }

    const receiverId =
      conversation[0].user1_id === senderId
        ? conversation[0].user2_id
        : conversation[0].user1_id;

    // Insert the message
    const [result] = await connection.query(
      'INSERT INTO messages (conversation_id, sender_id, receiver_id, content) VALUES (?, ?, ?, ?)',
      [conversationId, senderId, receiverId, content]
    );

    connection.release();
    res.status(201).json({
      id: result.insertId,
      conversation_id: conversationId,
      sender_id: senderId,
      receiver_id: receiverId,
      content,
    });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Database error' });
  }
};