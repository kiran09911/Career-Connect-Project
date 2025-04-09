const pool = require('../models/db');

exports.getUserById = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from the token

    const connection = await pool.getConnection();
    const [user] = await connection.query(
      'SELECT id, name, email, phone, gender, degree, institute, permanent_address, current_address FROM users WHERE id = ?',
      [userId]
    );

    connection.release();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ error: 'Database error' });
  }
};