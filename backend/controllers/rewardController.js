const db = require('../config/db')();

exports.createReward = async (req, res) => {
  const { user_id, badge, points } = req.body;
  try {
    await db.query('INSERT INTO rewards (user_id, badge, points) VALUES (?, ?, ?)', [user_id, badge, points]);
    res.status(201).json({ message: 'Reward created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRewards = async (req, res) => {
  const { user_id } = req.query;
  try {
    const [rows] = await db.query('SELECT * FROM rewards WHERE user_id = ?', [user_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
