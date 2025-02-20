const express = require('express');
const { createBudget, getBudgets } = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createBudget);
router.get('/', protect, csrfProtection, getBudgets);

module.exports = router;
