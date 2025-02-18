const express = require('express');
const { createTrip, getTrips } = require('../controllers/tripController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, createTrip);
router.get('/', protect, getTrips);

module.exports = router;
