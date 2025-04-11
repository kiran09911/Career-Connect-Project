const express = require('express');
const {updateProfile } = require('../controllers/profileController');
const { getUserProfile } = require('../controllers/profileController');
const authenticateToken = require('../middleware/authMiddleware');
const upload = require('../middleware/multerConfig');


const router = express.Router();

  router.get('/user', authenticateToken, getUserProfile);
  router.get('/profile', authenticateToken, getUserProfile);

// Route to update the authenticated user's profile with file upload
router.put('/recruiter/profile', authenticateToken, upload.single('profile_photo'), updateProfile);

module.exports = router;