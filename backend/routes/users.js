const e = require('express')
const r = e.Router()
const { User } = require('../models')
const auth = require('../middleware/authMiddleware')
r.get('/', auth, async (req, res) => {
  try {
    const us = await User.findAll({ attributes: ['id','fullName','email','role','createdAt'] })
    res.json(us)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.delete('/:id', auth, async (req, res) => {
  try {
    const u = await User.findByPk(req.params.id)
    if (!u) return res.status(404).json({ error: 'Не найден' })
    await u.destroy()
    res.json({ message: 'Удалён' })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
module.exports = r
