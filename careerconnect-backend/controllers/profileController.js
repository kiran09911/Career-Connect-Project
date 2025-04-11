const pool = require('../models/db');
const path = require('path');

exports.getUserProfile = async (req, res) => {
  try {
    console.log('User ID from token:', req.user.id); // Debugging
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT name, email FROM users WHERE id = ?', [userId]);

    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(rows[0]); // Return the user's name and email
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error' });
  }
};


// Controller to update the authenticated user's profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging
    console.log('Uploaded File:', req.file); // Debugging

    const userId = req.user.id; // Extract user ID from the token
    const { name, email, phone, gender, degree, institute, permanent_address, current_address } = req.body;

    // Check if all required fields are provided
    if (!name || !email || !phone || !gender || !degree || !institute || !permanent_address || !current_address) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Handle profile photo upload
    let profilePhotoPath = null;
    if (req.file) {
      profilePhotoPath = `/uploads/${req.file.filename}`; // Save the file path
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `UPDATE users 
       SET name = ?, email = ?, phone = ?, gender = ?, degree = ?, institute = ?, 
           permanent_address = ?, current_address = ?, profile_picture = ? 
       WHERE id = ?`,
      [
        name,
        email,
        phone,
        gender,
        degree,
        institute,
        JSON.stringify(permanent_address),
        JSON.stringify(current_address),
        profilePhotoPath,
        userId,
      ]
    );

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Database error' });
  }
};