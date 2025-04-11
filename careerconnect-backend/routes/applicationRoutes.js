const express = require('express');
const { submitApplication, getApplicationsForRecruiter } = require('../controllers/applicationController');
const { getAppliedJobsByCandidate } = require('../controllers/applicationController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/applications', authenticateToken, submitApplication);
router.get('/recruiter', authenticateToken, getApplicationsForRecruiter);
router.get('/applications/candidate', authenticateToken, getAppliedJobsByCandidate);


module.exports = router;