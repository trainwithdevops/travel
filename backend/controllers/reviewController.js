const db = require('../config/db')();

exports.createReview = async (req, res) => {
  const { trip_id, rating, comment } = req.body;
  try {
    await db.query('INSERT INTO reviews (user_id, trip_id, rating, comment) VALUES (?, ?, ?, ?)', [req.user.id, trip_id, rating, comment]);
    res.status(201).json({ message: 'Review created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReviews = async (req, res) => {
  const { trip_id } = req.query;
  try {
    const [rows] = await db.query('SELECT reviews.*, users.email FROM reviews JOIN users ON reviews.user_id = users.id WHERE reviews.trip_id = ?', [trip_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
