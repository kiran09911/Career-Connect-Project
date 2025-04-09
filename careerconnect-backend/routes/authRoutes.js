const express = require('express');
const { login } = require('../controllers/authController');
const { forgotPassword } = require('../controllers/authController');
const { register } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);

module.exports = router;