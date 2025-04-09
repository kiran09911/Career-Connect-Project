const express = require('express');
const { submitApplication, getApplicationsForRecruiter } = require('../controllers/applicationController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authenticateToken, submitApplication);
router.get('/recruiter', authenticateToken, getApplicationsForRecruiter);

module.exports = router;