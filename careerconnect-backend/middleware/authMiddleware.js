const jwt = require('jsonwebtoken');
const pool = require('../models/db'); // Importing db connection from server.js
const JWT_SECRET =  process.env.JWT_SECRET || 'your_jwt_secret'; // Load from .env or fallback

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    req.user = user; // Attach the user object to the request
    next();
  });
};



module.exports = authenticateToken;
