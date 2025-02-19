const express = require('express');
const { createTrip, getTrips } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createTrip);
router.get('/', protect, csrfProtection, getTrips);

module.exports = router;
