const express = require('express');
const { createTrip, getTrips, getMap } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const csrfProtection = require('../middleware/csrfMiddleware');
const router = express.Router();

router.post('/', protect, csrfProtection, createTrip);
router.get('/', protect, csrfProtection, getTrips);
router.get('/map', protect, csrfProtection, getMap);

module.exports = router;
