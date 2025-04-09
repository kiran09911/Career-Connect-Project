const express = require('express');
const { getJobs, postJob } = require('../controllers/jobController');
const { getRecruiterJobs } = require('../controllers/jobController');
const { updateJob, deleteJob } = require('../controllers/jobController');

const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getJobs);
router.post('/', authenticateToken, postJob);
router.get('/recruiter', authenticateToken, getRecruiterJobs);
router.put('/:id', authenticateToken, updateJob);
router.delete('/:id', authenticateToken, deleteJob);

module.exports = router;