const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Serve static frontend
app.use(express.static(path.join(__dirname, '..', 'public')));

// In-memory data store
let items = [];
let nextId = 1;

// CRUD API
app.get('/api/items', (req, res) => {
  res.json(items);
});

app.get('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const item = items.find((i) => i.id === id);
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

app.post('/api/items', (req, res) => {
  const { title, description } = req.body || {};
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'Title is required' });
  }
  const newItem = { id: nextId++, title, description: description || '' };
  items.push(newItem);
  res.status(201).json(newItem);
});

app.put('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const { title, description } = req.body || {};
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  if (title !== undefined && typeof title !== 'string') {
    return res.status(400).json({ error: 'Title must be a string' });
  }
  if (description !== undefined && typeof description !== 'string') {
    return res.status(400).json({ error: 'Description must be a string' });
  }
  items[index] = {
    ...items[index],
    title: title !== undefined ? title : items[index].title,
    description: description !== undefined ? description : items[index].description,
  };
  res.json(items[index]);
});

app.delete('/api/items/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = items.findIndex((i) => i.id === id);
  if (index === -1) return res.status(404).json({ error: 'Item not found' });
  const [deleted] = items.splice(index, 1);
  res.json(deleted);
});

// Fallback to index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});



