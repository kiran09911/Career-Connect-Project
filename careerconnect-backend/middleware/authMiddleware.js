const jwt = require('jsonwebtoken');
const pool = require('../models/db'); // Importing db connection from server.js
const JWT_SECRET =  process.env.JWT_SECRET || 'your_jwt_secret'; // Load from .env or fallback
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access denied, token missing!' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      console.error('JWT Verification Failed:', err.message);
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user; // Attach user info from token to request
    next();
  });
}

module.exports = authenticateToken;
