const express = require('express');
const router = express.Router();
const { Equipment } = require('../models'); // Импорт модели Equipment
const authenticateToken = require('../middleware/authMiddleware');

// GET /equipment — получить список всего оборудования
router.get('/', authenticateToken, async (req, res) => {
  try {
    const equipmentList = await Equipment.findAll();
    res.json(equipmentList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /equipment — создать новый элемент оборудования
router.post('/', async (req, res) => {
  try {
    const { name, type, status } = req.body;
    const newEquipment = await Equipment.create({ name, type, status });
    res.status(201).json(newEquipment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /equipment/:id — обновить данные оборудования по его ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, status } = req.body;
    const equipmentItem = await Equipment.findByPk(id);
    if (!equipmentItem) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    // Обновляем поля, если они переданы
    equipmentItem.name = name || equipmentItem.name;
    equipmentItem.type = type || equipmentItem.type;
    equipmentItem.status = status || equipmentItem.status;
    await equipmentItem.save();
    res.json(equipmentItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /equipment/:id — удалить оборудование по ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const equipmentItem = await Equipment.findByPk(id);
    if (!equipmentItem) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    await equipmentItem.destroy();
    res.json({ message: 'Equipment deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
