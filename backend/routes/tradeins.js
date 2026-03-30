const express = require('express');
const TradeIn = require('../models/TradeIn');
const auth = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/tradeins
// @desc    Get all trade-ins
// @access  Private (Admin)
router.get('/', auth, async (req, res) => {
  try {
    const tradeIns = await TradeIn.find({})
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json(tradeIns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/tradeins/mytradeins
// @desc    Get user trade-ins
// @access  Private
router.get('/mytradeins', auth, async (req, res) => {
  try {
    const tradeIns = await TradeIn.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(tradeIns);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET /api/tradeins/:id
// @desc    Get trade-in by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const tradeIn = await TradeIn.findById(req.params.id).populate('user', 'name email phone');

    if (!tradeIn) {
      return res.status(404).json({ msg: 'Trade-in not found' });
    }

    // Make sure user owns trade-in or is admin
    if (tradeIn.user._id.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    res.json(tradeIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST /api/tradeins
// @desc    Create new trade-in request
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const tradeIn = new TradeIn({
      ...req.body,
      user: req.user.id,
    });

    const createdTradeIn = await tradeIn.save();
    res.status(201).json(createdTradeIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/tradeins/:id
// @desc    Update trade-in
// @access  Private (Admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const tradeIn = await TradeIn.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!tradeIn) {
      return res.status(404).json({ msg: 'Trade-in not found' });
    }

    res.json(tradeIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/tradeins/:id/approve
// @desc    Approve trade-in with offered value
// @access  Private (Admin)
router.put('/:id/approve', auth, async (req, res) => {
  try {
    const { offeredValue, notes } = req.body;

    const tradeIn = await TradeIn.findById(req.params.id);

    if (!tradeIn) {
      return res.status(404).json({ msg: 'Trade-in not found' });
    }

    tradeIn.offeredValue = offeredValue;
    tradeIn.status = 'approved';
    if (notes) tradeIn.notes = notes;

    await tradeIn.save();
    res.json(tradeIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/tradeins/:id/reject
// @desc    Reject trade-in
// @access  Private (Admin)
router.put('/:id/reject', auth, async (req, res) => {
  try {
    const { notes } = req.body;

    const tradeIn = await TradeIn.findById(req.params.id);

    if (!tradeIn) {
      return res.status(404).json({ msg: 'Trade-in not found' });
    }

    tradeIn.status = 'rejected';
    if (notes) tradeIn.notes = notes;

    await tradeIn.save();
    res.json(tradeIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT /api/tradeins/:id/complete
// @desc    Mark trade-in as completed
// @access  Private (Admin)
router.put('/:id/complete', auth, async (req, res) => {
  try {
    const tradeIn = await TradeIn.findById(req.params.id);

    if (!tradeIn) {
      return res.status(404).json({ msg: 'Trade-in not found' });
    }

    tradeIn.status = 'completed';

    await tradeIn.save();
    res.json(tradeIn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;