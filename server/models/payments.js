// models/Payment.js
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
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
  paymentId: String,
  orderId: String,
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
  
  method: String,

  creditsPurchased: Number,

  // ✅ Use 'type', not 'plantype'
  type: {
    type: String,
    enum: ['subscription', 'one-time'],
    required: true
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});




module.exports = mongoose.model('Transaction', transactionSchema);
