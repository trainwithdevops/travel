const db = require('../config/db')();

exports.createBudget = async (req, res) => {
  const { trip_id, item, cost } = req.body;
  try {
    await db.query('INSERT INTO budgets (trip_id, item, cost) VALUES (?, ?, ?)', [trip_id, item, cost]);
    res.status(201).json({ message: 'Budget item created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBudgets = async (req, res) => {
  const { trip_id } = req.query;
  try {
    const [rows] = await db.query('SELECT * FROM budgets WHERE trip_id = ?', [trip_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
