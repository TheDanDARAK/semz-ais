const express = require('express');
const router = express.Router();
const { Operations } = require('../models'); // Импортируем модель Operations

// GET /operations — получить список всех операций
router.get('/', async (req, res) => {
  try {
    const operationsList = await Operations.findAll();
    res.json(operationsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /operations — создать новую операцию
router.post('/', async (req, res) => {
  try {
    const { route_id, equipment_id, step_number, description, time_estimate } = req.body;
    const newOperation = await Operations.create({
      route_id,
      equipment_id,
      step_number,
      description,
      time_estimate
    });
    res.status(201).json(newOperation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /operations/:id — обновить операцию
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { route_id, equipment_id, step_number, description, time_estimate } = req.body;
    const operationItem = await Operations.findByPk(id);
    if (!operationItem) {
      return res.status(404).json({ error: 'Operation not found' });
    }
    // Обновляем поля, если они переданы
    if (route_id !== undefined) operationItem.route_id = route_id;
    if (equipment_id !== undefined) operationItem.equipment_id = equipment_id;
    if (step_number !== undefined) operationItem.step_number = step_number;
    if (description !== undefined) operationItem.description = description;
    if (time_estimate !== undefined) operationItem.time_estimate = time_estimate;
    await operationItem.save();
    res.json(operationItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /operations/:id — удалить операцию
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const operationItem = await Operations.findByPk(id);
    if (!operationItem) {
      return res.status(404).json({ error: 'Operation not found' });
    }
    await operationItem.destroy();
    res.json({ message: 'Operation deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
