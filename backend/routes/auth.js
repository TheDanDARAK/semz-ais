const e = require('express')
const r = e.Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { User } = require('../models')
require('dotenv').config()
r.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body
    const u = await User.findOne({ where: { email } })
    if (u) return res.status(400).json({ error: 'Пользователь уже существует' })
    const p = await bcrypt.hash(password, 10)
    const nu = await User.create({ fullName, email, passwordHash: p })
    res.status(201).json({ message: 'Регистрация успешна', userId: nu.id })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const u = await User.findOne({ where: { email } })
    if (!u) return res.status(400).json({ error: 'Неверный email или пароль' })
    const ok = await bcrypt.compare(password, u.passwordHash)
    if (!ok) return res.status(400).json({ error: 'Неверный email или пароль' })
    const t = jwt.sign({ id: u.id, email: u.email, role: u.role }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '1d' })
    res.json({ message: 'Вход выполнен', token: t, role: u.role })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
module.exports = r
