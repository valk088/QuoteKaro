// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paymentGateway: {
    type: String,
    enum: ['razorpay', 'stripe'],
    required: true
  },
  paymentId: String,     // e.g., Razorpay payment ID
  orderId: String,       // Your internal order ID
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'pending'
  },
  method: String,         // UPI, Card, etc.
  creditsPurchased: Number,
  creditsUsed: Number,
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
