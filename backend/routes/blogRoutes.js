const express = require('express');
const { createBlog, getBlogs } = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createBlog);
router.get('/', csrfProtection, getBlogs);

module.exports = router;
