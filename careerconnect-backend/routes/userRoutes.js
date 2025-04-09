// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const { getUserById } = require('../controllers/userController');
// const authenticateToken = require('../middleware/authMiddleware');
// const { getUserProfile } = require("../controllers/userController");

// // GET request to fetch user profile
// router.get("/user/:id", getUserProfile);




// // Get user profile
// router.get('/profile/:id', (req, res) => {
//     const userId = req.params.id;
//     User.getUserById(userId, (err, user) => {
//         if (err) return res.status(500).json({ error: "Database error" });
//         res.json(user);
//     });
// });

// // Update user profile
// router.put('/profile/:id', (req, res) => {
//     const userId = req.params.id;
//     const userData = req.body;

//     User.updateUser(userId, userData, (err, result) => {
//         if (err) return res.status(500).json({ error: "Database update failed" });
//         res.json({ message: "Profile updated successfully", result });
//     });
// });

// router.get('/', authenticateToken, getUserById);

// module.exports = router;
const express = require('express');
const { getUserById } = require('../controllers/userController'); // Ensure this matches the export in userController.js
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

// Route to fetch user profile
router.get('/', authenticateToken, getUserById);

module.exports = router;