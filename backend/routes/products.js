const express = require('express');
const Product = require('../models/Product');
const protect = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.post('/', protect, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

module.exports = router;