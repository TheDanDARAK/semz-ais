
const express = require('express');
const router = express.Router();
const { Parts } = require('../models');

// GET /parts — получить список всех деталей
router.get('/', async (req, res) => {
  try {
    const partsList = await Parts.findAll();
    res.json(partsList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST /parts — создать новую деталь
router.post('/', async (req, res) => {
  try {
    const { name, description } = req.body;
    const newPart = await Parts.create({ name, description });
    res.status(201).json(newPart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// PUT /parts/:id — обновить данные детали
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const part = await Parts.findByPk(id);
    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }
    part.name = name || part.name;
    part.description = description || part.description;
    await part.save();
    res.json(part);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// DELETE /parts/:id — удалить деталь
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const part = await Parts.findByPk(id);
    if (!part) {
      return res.status(404).json({ error: 'Part not found' });
    }
    await part.destroy();
    res.json({ message: 'Part deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
