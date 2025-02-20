const db = require('../config/db')();

exports.createChat = async (req, res) => {
  const { room_id, message } = req.body;
  try {
    await db.query('INSERT INTO chats (user_id, room_id, message) VALUES (?, ?, ?)', [req.user.id, room_id, message]);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getChats = async (req, res) => {
  const { room_id } = req.query;
  try {
    const [rows] = await db.query('SELECT chats.*, users.email FROM chats JOIN users ON chats.user_id = users.id WHERE room_id = ?', [room_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
