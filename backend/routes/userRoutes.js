const express = require('express');
const multer = require('multer');
const { registerUser, loginUser, getUsers, getUserProfile, updateUserProfile, logoutUser, submitFeedback, uploadProfilePicture } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

const upload = multer({ dest: 'uploads/' });

router.post('/register', csrfProtection, registerUser);
router.post('/login', csrfProtection, loginUser);
router.get('/', protect, csrfProtection, getUsers);
router.get('/profile', protect, csrfProtection, getUserProfile);
router.put('/profile', protect, csrfProtection, updateUserProfile);
router.post('/logout', protect, csrfProtection, logoutUser);
router.post('/feedback', protect, csrfProtection, submitFeedback);
router.post('/profile-picture', protect, csrfProtection, upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;
