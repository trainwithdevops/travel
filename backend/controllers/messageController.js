const db = require('../config/db')();

exports.sendMessage = async (req, res) => {
  const { recipientId, content } = req.body;
  try {
    await db.query('INSERT INTO messages (sender_id, recipient_id, content) VALUES (?, ?, ?)', [req.user.id, recipientId, content]);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM messages WHERE sender_id = ? OR recipient_id = ?', [req.user.id, req.user.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
