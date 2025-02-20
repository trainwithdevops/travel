const db = require('../config/db')();

exports.createAdvice = async (req, res) => {
  const { title, content } = req.body;
  try {
    await db.query('INSERT INTO advice (user_id, title, content) VALUES (?, ?, ?)', [req.user.id, title, content]);
    res.status(201).json({ message: 'Advice created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAdvice = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT advice.*, users.email FROM advice JOIN users ON advice.user_id = users.id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
