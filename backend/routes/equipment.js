const e = require('express')
const r = e.Router()
const { Equipment } = require('../models')
const auth = require('../middleware/authMiddleware')
r.get('/', auth, async (req, res) => {
  try {
    const eq = await Equipment.findAll()
    res.json(eq)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.post('/', auth, async (req, res) => {
  try {
    const { name, type, status } = req.body
    const eq = await Equipment.create({ name, type, status })
    res.status(201).json(eq)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.put('/:id', auth, async (req, res) => {
  try {
    const eq = await Equipment.findByPk(req.params.id)
    if (!eq) return res.status(404).json({ error: 'Не найдено' })
    const { name, type, status } = req.body
    await eq.update({ name, type, status })
    res.json(eq)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.delete('/:id', auth, async (req, res) => {
  try {
    const eq = await Equipment.findByPk(req.params.id)
    if (!eq) return res.status(404).json({ error: 'Не найдено' })
    await eq.destroy()
    res.json({ message: 'Удалено' })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
module.exports = r
