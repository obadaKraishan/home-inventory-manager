import express from 'express';
import Item from '../models/Item.js';

const router = express.Router();

// Get all items
router.get('/', async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// Add a new item
router.post('/', async (req, res) => {
  const { name, category, purchaseDate, warrantyPeriod } = req.body;
  const newItem = new Item({ name, category, purchaseDate, warrantyPeriod });
  await newItem.save();
  res.status(201).json(newItem);
});

// Update an item
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, purchaseDate, warrantyPeriod } = req.body;
  const updatedItem = await Item.findByIdAndUpdate(id, { name, category, purchaseDate, warrantyPeriod }, { new: true });
  res.json(updatedItem);
});

// Delete an item
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Item.findByIdAndDelete(id);
  res.status(204).end();
});

export default router;
