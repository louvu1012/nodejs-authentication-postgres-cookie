const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { createUser, findUserByEmail, findUserById } = require('../models/user');
const authenticateToken = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

const isProduction = process.env.NODE_ENV === 'production';

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await createUser(email, password);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('ACCESS_TOKEN', token, { httpOnly: true, secure: isProduction, sameSite: 'none' });
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
});

router.post('/logout', authenticateToken, (req, res) => {
    res.clearCookie('ACCESS_TOKEN', { httpOnly: true, secure: isProduction, sameSite: 'none' });
    res.json({ message: 'Logout successful' });
});

router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user data' });
  }
});

module.exports = router;
