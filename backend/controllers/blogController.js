const db = require('../config/db')();

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const [result] = await db.query('INSERT INTO blogs (user_id, title, content) VALUES (?, ?, ?)', [req.user.id, title, content]);
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM blogs');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
