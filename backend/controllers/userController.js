const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db')();
const { upload } = require('../utils/upload');
const passport = require('passport');

exports.registerUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    const user = rows[0];
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: true });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.googleAuth = passport.authenticate('google', { scope: ['profile', 'email'] });

exports.googleAuthCallback = passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
  const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, { httpOnly: true, secure: true });
  res.redirect('/');
};

exports.getUsers = async (req, res) => {
  const { destination, budget, currency, language } = req.query;
  try {
    let query = 'SELECT * FROM users WHERE 1=1';
    const params = [];
    if (destination) {
      query += ' AND destination = ?';
      params.push(destination);
    }
    if (budget) {
      query += ' AND budget = ?';
      params.push(budget);
    }
    if (currency) {
      query += ' AND currency = ?';
      params.push(currency);
    }
    if (language) {
      query += ' AND language = ?';
      params.push(language);
    }
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [req.user.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  const { destination, budget, currency, language, socialLinks } = req.body;
  try {
    await db.query('UPDATE users SET destination = ?, budget = ?, currency = ?, language = ?, social_links = ? WHERE id = ?', [destination, budget, currency, language, socialLinks, req.user.id]);
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.uploadProfilePicture = async (req, res) => {
  try {
    const profilePicture = req.file.path;
    await db.query('UPDATE users SET profile_picture = ? WHERE id = ?', [profilePicture, req.user.id]);
    res.json({ message: 'Profile picture uploaded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};

exports.submitFeedback = async (req, res) => {
  const { feedback } = req.body;
  try {
    await db.query('INSERT INTO feedback (user_id, feedback) VALUES (?, ?)', [req.user.id, feedback]);
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
