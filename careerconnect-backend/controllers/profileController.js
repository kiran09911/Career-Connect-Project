
const pool = require('../models/db');
const path = require('path');

exports.getUserProfile = async (req, res) => {
  try {
    console.log('User ID from token:', req.user.id); // Debugging
    const userId = req.user.id;

    const connection = await pool.getConnection();
    const [rows] = await connection.query(
      'SELECT id, name, email, phone, gender, degree, institute, permanent_address, current_address, profile_picture FROM users WHERE id = ?',
      [userId]
    );

    connection.release();

    if (rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = rows[0];
    // Parse JSON fields if they are stored as strings in the database
    const permanentAddress = typeof user.permanent_address === 'string' ? JSON.parse(user.permanent_address) : user.permanent_address;
    const currentAddress = typeof user.current_address === 'string' ? JSON.parse(user.current_address) : user.current_address;

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      gender: user.gender,
      degree: user.degree,
      institute: user.institute,
      permanent_address: permanentAddress,
      current_address: currentAddress,
      profile_photo: user.profile_picture, // Map profile_picture to profile_photo for frontend consistency
    });
  } catch (err) {
    console.error('Error fetching user profile:', err);
    res.status(500).json({ message: 'Server error', details: err.message, code: err.code });
  }
};

// Controller to update the authenticated user's profile
exports.updateProfile = async (req, res) => {
  try {
    console.log('Request Body:', req.body); // Debugging
    console.log('Uploaded File:', req.file); // Debugging

    const userId = req.user.id; // Extract user ID from the token
    const { name, email, phone, gender, degree, institute, permanent_address, current_address } = req.body;

    // Check if required fields are provided
    if (!name || !email || !gender) {
      return res.status(400).json({ message: 'Name, email, and gender are required' });
    }

    // Parse JSON fields if they are strings
    const parsedPermanentAddress =
      typeof permanent_address === "string" && permanent_address
        ? JSON.parse(permanent_address)
        : permanent_address || { province: '', district: '', municipality: '', city: '' };
    const parsedCurrentAddress =
      typeof current_address === "string" && current_address
        ? JSON.parse(current_address)
        : current_address || { province: '', district: '', municipality: '', city: '' };

    // Handle profile photo upload
    let profilePhotoPath = null;
    if (req.file) {
      profilePhotoPath = `/uploads/${req.file.filename}`; // Save the file path
      console.log('Profile Photo Path to be saved:', profilePhotoPath); // Debug: Log the path
    } else {
      console.log('No new file uploaded, keeping existing profile_picture'); // Debug: Log if no file
    }

    const connection = await pool.getConnection();
    const [result] = await connection.query(
      `UPDATE users 
       SET name = ?, email = ?, phone = ?, gender = ?, degree = ?, institute = ?, 
           permanent_address = ?, current_address = ?, profile_picture = COALESCE(?, profile_picture)
       WHERE id = ?`,
      [
        name,
        email,
        phone || null,
        gender,
        degree || null,
        institute || null,
        JSON.stringify(parsedPermanentAddress),
        JSON.stringify(parsedCurrentAddress),
        profilePhotoPath,
        userId,
      ]
    );

    console.log('Database Update Result:', result); // Debug: Log the result of the update

    connection.release();

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully' });
  } catch (err) {
    console.error('Error updating profile:', err);
    res.status(500).json({ error: 'Database error', details: err.message, code: err.code });
  }
};