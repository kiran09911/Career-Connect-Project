const pool = require('../models/db');

// Controller to get the authenticated user's profile
exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, name, email, role FROM users WHERE id = ?', [userId]);

    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Controller to update the authenticated user's profile
exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email, company, location } = req.body;

    const connection = await pool.getConnection();

    const [result] = await connection.query(
      `UPDATE users 
       SET name = ?, email = ?, company = ?, location = ? 
       WHERE id = ?`,
      [name, email, company, location, userId]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};