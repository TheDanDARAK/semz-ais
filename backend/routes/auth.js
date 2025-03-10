const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Импорт модели User

// В реальном приложении секретный ключ надо хранить в переменных окружения
const secretKey = 'your_secret_key'; 

// POST /auth/register — регистрация нового пользователя
router.post('/register', async (req, res) => {
  try {
    const { full_name, email, password, role } = req.body;
    
    // Проверяем, существует ли пользователь с таким email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }
    
    // Хэшируем пароль
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    // Создаём пользователя
    const newUser = await User.create({ full_name, email, password_hash, role });
    res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// POST /auth/login — вход пользователя
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Находим пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }
    
    // Сравниваем пароль с хэшем
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }
    
    // Создаём JWT-токен
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    
    res.json({ message: 'Успешный вход', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
