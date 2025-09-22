const Item = require('../models/Item');

async function listItems(req, res, next) {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    next(err);
  }
}

async function getItem(req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    next(err);
  }
}

async function createItem(req, res, next) {
  try {
    const { title, description } = req.body || {};
    if (!title) return res.status(400).json({ error: 'Title is required' });
    const created = await Item.create({ title, description });
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const { title, description } = req.body || {};
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: { ...(title !== undefined && { title }), ...(description !== undefined && { description }) } },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json(deleted);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  listItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
};



