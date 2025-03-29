const e = require('express')
const r = e.Router()
const { Operation, Route, Equipment } = require('../models')
const auth = require('../middleware/authMiddleware')
r.get('/', auth, async (req, res) => {
  try {
    const ops = await Operation.findAll()
    res.json(ops)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.post('/', auth, async (req, res) => {
  try {
    const { routeId, equipmentId, stepNumber, description, timeEstimate } = req.body
    const rt = await Route.findByPk(routeId)
    if (!rt) return res.status(400).json({ error: 'Неверный routeId' })
    if (equipmentId) {
      const eq = await Equipment.findByPk(equipmentId)
      if (!eq) return res.status(400).json({ error: 'Неверный equipmentId' })
    }
    const op = await Operation.create({ routeId, equipmentId, stepNumber, description, timeEstimate })
    res.status(201).json(op)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.put('/:id', auth, async (req, res) => {
  try {
    const op = await Operation.findByPk(req.params.id)
    if (!op) return res.status(404).json({ error: 'Не найдено' })
    const { routeId, equipmentId, stepNumber, description, timeEstimate } = req.body
    if (routeId) {
      const rt = await Route.findByPk(routeId)
      if (!rt) return res.status(400).json({ error: 'Неверный routeId' })
    }
    if (equipmentId) {
      const eq = await Equipment.findByPk(equipmentId)
      if (!eq) return res.status(400).json({ error: 'Неверный equipmentId' })
    }
    await op.update({ routeId, equipmentId, stepNumber, description, timeEstimate })
    res.json(op)
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
r.delete('/:id', auth, async (req, res) => {
  try {
    const op = await Operation.findByPk(req.params.id)
    if (!op) return res.status(404).json({ error: 'Не найдено' })
    await op.destroy()
    res.json({ message: 'Удалено' })
  } catch (x) {
    res.status(500).json({ error: 'Ошибка сервера' })
  }
})
module.exports = r
