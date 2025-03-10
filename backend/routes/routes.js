const express = require('express');
const router = express.Router();
const { Routes } = require('../models'); // Импортируем модель Routes

// GET /routes — получить список всех маршрутных карт
router.get('/', async (req, res) => {
  try {
    const routesList = await Routes.findAll();
    res.json(routesList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /routes — создать новую маршрутную карту
router.post('/', async (req, res) => {
  try {
    const { part_id, name } = req.body;
    // Можно проверить, что part_id ссылается на реальную деталь, если нужно
    const newRoute = await Routes.create({ part_id, name });
    res.status(201).json(newRoute);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /routes/:id — обновить маршрутную карту
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { part_id, name } = req.body;
    const routeItem = await Routes.findByPk(id);
    if (!routeItem) {
      return res.status(404).json({ error: 'Route not found' });
    }
    // Обновляем поля, если переданы
    if (part_id) routeItem.part_id = part_id;
    if (name) routeItem.name = name;
    await routeItem.save();
    res.json(routeItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /routes/:id — удалить маршрутную карту
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const routeItem = await Routes.findByPk(id);
    if (!routeItem) {
      return res.status(404).json({ error: 'Route not found' });
    }
    await routeItem.destroy();
    res.json({ message: 'Route deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
