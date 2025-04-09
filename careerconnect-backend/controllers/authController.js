const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../models/db');
const nodemailer = require('nodemailer');
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const connection = await pool.getConnection();

    const [result] = await connection.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    const token = jwt.sign({ id: result.insertId, role }, JWT_SECRET, { expiresIn: '30d' });

    connection.release();
    res.status(201).json({ message: 'User registered successfully', token, userId: result.insertId, role });
  } catch (error) {
    console.error('Registration error:', error);
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(400).json({ message: 'Email already exists' });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const connection = await pool.getConnection();

    const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      connection.release();
      return res.status(400).json({ message: 'User not found' });
    }

    const user = rows[0];
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      connection.release();
      return res.status(401).json({ message: 'Incorrect password' });
    }

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: '30d' });

    connection.release();
    res.json({ message: 'Login successful', token, userId: user.id, role: user.role, name: user.name });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const connection = await pool.getConnection();
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);

    if (user.length === 0) {
      connection.release();
      return res.status(404).json({ message: 'User with this email does not exist.' });
    }

    // Generate a reset token (for simplicity, using a random string here)
    const resetToken = Math.random().toString(36).substring(2, 15);

    // Save the reset token in the database (you can also set an expiration time)
    await connection.query('UPDATE users SET reset_token = ? WHERE email = ?', [resetToken, email]);
    connection.release();

    // Send the reset email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS, // Your email password
      },
    });

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res.json({ message: 'Password reset link has been sent to your email.' });
  } catch (err) {
    console.error('Error handling forgot password:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};