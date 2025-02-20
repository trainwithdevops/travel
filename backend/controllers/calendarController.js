const db = require('../config/db')();

exports.createEvent = async (req, res) => {
  const { title, description, start, end } = req.body;
  try {
    await db.query('INSERT INTO calendar_events (user_id, title, description, start, end) VALUES (?, ?, ?, ?, ?)', [req.user.id, title, description, start, end]);
    res.status(201).json({ message: 'Event created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM calendar_events WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
