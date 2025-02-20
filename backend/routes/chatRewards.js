const express = require('express');
const { createChat, getChats } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createChat);
router.get('/', protect, csrfProtection, getChats);

module.exports = router;
