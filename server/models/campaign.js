const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['cold_email', 'newsletter', 'promotional', 'transactional', 'broadcast'], // Added 'broadcast' for general admin messages
    default: 'cold_email',
  },
  status: {
    type: String,
    enum: ['draft', 'active', 'paused', 'completed', 'cancelled'],
    default: 'draft',
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmailTemplate',
    required: false, // Not all campaigns might use a specific template directly
  },
  sentCount: { // Changed from 'sent' to 'sentCount' to avoid conflict with boolean 'sent'
    type: Number,
    default: 0,
  },
  opensCount: { // Changed from 'opens'
    type: Number,
    default: 0,
  },
  clicksCount: { // Changed from 'clicks'
    type: Number,
    default: 0,
  },
  lastSentDate: { // Changed from 'lastSent' to avoid potential naming conflicts
    type: Date,
    default: null,
  },
  // Optionally, add targeting criteria here (e.g., user groups, plan types)
  targetAudience: {
    type: String,
    enum: ['all_users', 'active_users', 'inactive_users', 'pro_plan_users', 'enterprise_users', 'specific_users', 'low_credits_users', 'expiring_plans'],
    default: 'all_users',
  },
  sendDate: { // For scheduled campaigns
    type: Date,
    default: null,
  },
  // Add an array of recipient user IDs if 'specific_users' is chosen
  recipientUsers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

module.exports = mongoose.model('Campaign', campaignSchema);
