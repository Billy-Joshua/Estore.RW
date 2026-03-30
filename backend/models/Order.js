const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number
  }],
  total: { type: Number, required: true },
  shippingAddress: {
    name: String,
    phone: String,
    address: String,
    province: String
  },
  paymentMethod: String,
  status: { type: String, default: 'pending' },
  trackingCode: String
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);