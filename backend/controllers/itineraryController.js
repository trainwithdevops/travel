const db = require('../config/db')();

exports.createItinerary = async (req, res) => {
  const { trip_id, title, description } = req.body;
  try {
    await db.query('INSERT INTO itineraries (trip_id, title, description) VALUES (?, ?, ?)', [trip_id, title, description]);
    res.status(201).json({ message: 'Itinerary created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getItineraries = async (req, res) => {
  const { trip_id } = req.query;
  try {
    const [rows] = await db
