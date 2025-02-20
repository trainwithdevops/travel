const express = require('express');
const { createReward, getRewards } = require('../controllers/rewardController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createReward);
router.get('/', protect, csrfProtection, getRewards);

module.exports = router;
