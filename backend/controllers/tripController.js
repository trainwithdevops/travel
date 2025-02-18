const Trip = require('../models/Trip');

exports.createTrip = async (req, res) => {
  const { title, description, destination, startDate, endDate } = req.body;
  try {
    const trip = new Trip({
      user: req.user.id,
      title,
      description,
      destination,
      startDate,
      endDate,
    });
    await trip.save();
    res.status(201).json(trip);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.user.id });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
