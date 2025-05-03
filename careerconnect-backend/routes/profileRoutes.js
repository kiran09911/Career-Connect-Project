// const express = require('express');
// const {updateProfile } = require('../controllers/profileController');
// const { getUserProfile } = require('../controllers/profileController');
// const authenticateToken = require('../middleware/authMiddleware');
// const upload = require('../middleware/multerConfig');


// const router = express.Router();

//   router.get('/user', authenticateToken, getUserProfile);
//   router.get('/recruiter/profile', authenticateToken, getUserProfile);
//   router.get('/candidate/profile', authenticateToken, getUserProfile);

// // Route to update the authenticated user's profile with file upload
// router.put('/recruiter/profile', authenticateToken, upload.single('profile_photo'), updateProfile);
// router.put('/candidate/profile', authenticateToken, upload.single('profile_photo'), updateProfile);

// module.exports = router;

const express = require('express');
const router = express.Router();
const { getUserProfile, updateProfile } = require('../controllers/profileController');
const upload = require('../middleware/multerConfig'); // Import the multer middleware
const authenticateToken = require('../middleware/authMiddleware');
const authMiddleware = require('../middleware/authMiddleware'); // Assuming you have authentication middleware

// Route to get the candidate's profile
  router.get('/user', authenticateToken, getUserProfile);
  router.get('/recruiter/profile', authenticateToken, getUserProfile);
  router.get('/candidate/profile', authenticateToken, getUserProfile);

// Route to update the authenticated user's profile with file upload
router.put('/recruiter/profile', authenticateToken, upload.single('profile_photo'), updateProfile);
router.put('/candidate/profile', authenticateToken, upload.single('profile_photo'), updateProfile);
module.exports = router;