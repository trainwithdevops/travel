const db = require('../config/db')();

exports.getNotifications = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM notifications WHERE user_id = ?', [req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createNotification = async (req, res) => {
  const { content } = req.body;
  try {
    await db.query('INSERT INTO notifications (user_id, content) VALUES (?, ?)', [req.user.id, content]);
    res.status(201).json({ message: 'Notification created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
