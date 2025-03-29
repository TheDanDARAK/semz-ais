const e = require('express')
const r = e.Router()
const { Route, Part } = require('../models')
const auth = require('../middleware/authMiddleware')
r.get('/', auth, async (req, res) => {
  try {
    const rs = await Route.findAll()
    res.json(rs)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.post('/', auth, async (req, res) => {
  try {
    const { partId, name } = req.body
    const p = await Part.findByPk(partId)
    if (!p) return res.status(400).json({ error: 'Неверный partId' })
    const nr = await Route.create({ partId, name })
    res.status(201).json(nr)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.put('/:id', auth, async (req, res) => {
  try {
    const rt = await Route.findByPk(req.params.id)
    if (!rt) return res.status(404).json({ error: 'Не найдено' })
    const { name } = req.body
    await rt.update({ name })
    res.json(rt)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.delete('/:id', auth, async (req, res) => {
  try {
    const rt = await Route.findByPk(req.params.id)
    if (!rt) return res.status(404).json({ error: 'Не найдено' })
    await rt.destroy()
    res.json({ message: 'Удалено' })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
module.exports = r
