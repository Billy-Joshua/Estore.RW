const express = require('express');
const Order = require('../models/Order');
const protect = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const order = await Order.create({ ...req.body, user: req.user.id });
  res.status(201).json(order);
});

router.get('/myorders', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(orders);
});

module.exports = router;