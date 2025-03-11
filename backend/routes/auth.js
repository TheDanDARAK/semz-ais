const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Импорт модели User

// В реальном приложении секретный ключ храните в переменной окружения
const secretKey = 'your_secret_key'; 

// POST /auth/register — регистрация нового пользователя
router.post('/register', async (req, res) => {
  try {
    // Извлекаем данные из тела запроса
    let { full_name, email, password, role } = req.body;
    
    // Логируем исходный email (для отладки)
    console.log('Raw email:', email);
    
    // Приводим email к нижнему регистру и удаляем пробелы
    email = email.trim().toLowerCase();
    console.log('Processed email:', email);
    
    // Проверяем, существует ли уже пользователь с таким email
    const existingUser = await User.findOne({ where: { email } });
    console.log('existingUser:', existingUser);
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }
    
    // Хэшируем пароль
    const saltRounds = 10;
    const password_hash = await bcrypt.hash(password, saltRounds);
    
    // Создаём нового пользователя
    const newUser = await User.create({ full_name, email, password_hash, role });
    res.status(201).json({ message: 'Пользователь зарегистрирован', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

// POST /auth/login — вход пользователя
router.post('/login', async (req, res) => {
  try {
    let { email, password } = req.body;
    console.log('Login attempt with email:', email);
    
    // Приводим email к стандартному виду для поиска
    email = email.trim().toLowerCase();
    
    // Ищем пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }
    
    // Сравниваем введённый пароль с сохранённым хэшем
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Неверный email или пароль' });
    }
    
    // Создаём JWT-токен с полезной нагрузкой
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
    
    res.json({ message: 'Успешный вход', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

module.exports = router;
