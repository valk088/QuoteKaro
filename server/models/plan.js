// models/Plan.js
const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['subscription', 'one-time'],
    required: true
  },
  description: String,

  monthlyPrice:{
    type: Number,
    required: true
  },
  yearlyPrice: {
    type: Number,
    required: true
  },
  
  credits: {
    type: Number,
    required: true
  },

  bonusCredits: { type: Number, default: 0 }, // for one-time plans

  features: [String], 

  isPopular: { type: Boolean, default: false },

  // isRecurring: {
  //   type: Boolean,
  //   default: false
  // },
  // billingCycle: {
  //   type: String,
  //   enum: ['monthly', 'yearly'],
  //   default: 'monthly'
  // },

  isActive: {
    type: Boolean,
    default: true
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Plan', planSchema);
