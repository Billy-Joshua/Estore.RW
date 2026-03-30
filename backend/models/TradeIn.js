const express = require('express');
const TradeIn = require('../models/TradeIn');
const protect = require('../middleware/auth');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const tradeIn = await TradeIn.create({ ...req.body, user: req.user.id });
  res.status(201).json(tradeIn);
});

router.get('/my', protect, async (req, res) => {
  const tradeIns = await TradeIn.find({ user: req.user.id }).sort({ createdAt: -1 });
  res.json(tradeIns);
});

module.exports = router;