const express = require('express');
const { registerUser, loginUser, getUsers, getUserProfile, updateUserProfile, logoutUser, submitFeedback } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/register', csrfProtection, registerUser);
router.post('/login', csrfProtection, loginUser);
router.get('/', protect, csrfProtection, getUsers);
router.get('/profile', protect, csrfProtection, getUserProfile);
router.put('/profile', protect, csrfProtection, updateUserProfile);
router.post('/logout', protect, csrfProtection, logoutUser);
router.post('/feedback', protect, csrfProtection, submitFeedback);

module.exports = router;
