const db = require('../config/db')();

exports.createTrip = async (req, res) => {
  const { title, description, destination, startDate, endDate } = req.body;
  try {
    const [result] = await db.query('INSERT INTO trips (user_id, title, description, destination, start_date, end_date) VALUES (?, ?, ?, ?, ?, ?)', [req.user.id, title, description, destination, startDate, endDate]);
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
