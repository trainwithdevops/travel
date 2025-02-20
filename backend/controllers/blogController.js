const db = require('../config/db')();

exports.createBlog = async (req, res) => {
  const { title, content, category_id } = req.body;
  try {
    await db.query('INSERT INTO blogs (user_id, title, content, category_id) VALUES (?, ?, ?, ?)', [req.user.id, title, content, category_id]);
    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT blogs.*, categories.name as category FROM blogs JOIN categories ON blogs.category_id = categories.id');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM categories');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
