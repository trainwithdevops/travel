const express = require('express');
const { createAdvice, getAdvice } = require('../controllers/adviceController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createAdvice);
router.get('/', protect, csrfProtection, getAdvice);

module.exports = router;
