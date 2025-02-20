const db = require('../config/db')();
const { Client } = require("@googlemaps/google-maps-services-js");

exports.createTrip = async (req, res) => {
  const { title, description, destination, startDate, endDate, participants } = req.body;
  try {
    const [result] = await db.query('INSERT INTO trips (user_id, title, description, destination, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, title, description, destination, startDate, endDate]);
    const tripId = result.insertId;
    if (participants && participants.length > 0) {
      const values = participants.map(p => [tripId, p]);
      await db.query('INSERT INTO trip_participants (trip_id, user_id) VALUES ?', [values]);
    }
    res.status(201).json({ message: 'Trip created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM trips WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMap = async (req, res) => {
  const { destination } = req.query;
  const client = new Client({});
  try {
    const response = await client.geocode({
      params: {
        address: destination,
        key: process.env.GOOGLE_MAPS_API_KEY,
      },
      timeout: 1000
    });
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
