const e = require('express')
const r = e.Router()
const { Part } = require('../models')
const auth = require('../middleware/authMiddleware')
r.get('/', auth, async (req, res) => {
  try {
    const ps = await Part.findAll()
    res.json(ps)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.post('/', auth, async (req, res) => {
  try {
    const { name, description } = req.body
    const p = await Part.create({ name, description })
    res.status(201).json(p)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.put('/:id', auth, async (req, res) => {
  try {
    const p = await Part.findByPk(req.params.id)
    if (!p) return res.status(404).json({ error: 'Не найдена' })
    const { name, description } = req.body
    await p.update({ name, description })
    res.json(p)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.delete('/:id', auth, async (req, res) => {
  try {
    const p = await Part.findByPk(req.params.id)
    if (!p) return res.status(404).json({ error: 'Не найдена' })
    await p.destroy()
    res.json({ message: 'Удалено' })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
module.exports = r
