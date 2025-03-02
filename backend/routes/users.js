const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Импортируем модель User из папки models

// GET /users — получить список всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /users — создать нового пользователя
router.post('/', async (req, res) => {
  try {
    const { full_name, email, password_hash, role } = req.body;
    const newUser = await User.create({
      full_name,
      email,
      password_hash,
      role
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
