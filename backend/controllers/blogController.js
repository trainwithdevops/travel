const Blog = require('../models/Blog');

exports.createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({
      user: req.user.id,
      title,
      content,
    });
    await blog.save();
    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('user', 'email');
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
