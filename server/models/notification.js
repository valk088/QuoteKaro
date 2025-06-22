const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true, // A notification is always for a specific user
  },
  type: {
    type: String,
    enum: ['info', 'success', 'warning', 'error', 'system', 'billing', 'update', 'security', 'report', 'account'], // Client-side display types
    default: 'info',
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  read: {
    type: Boolean,
    default: false,
  },
  category: { // For client-side filtering, similar to your dummy data
    type: String,
    enum: ['billing', 'updates', 'system', 'security', 'reports', 'account', 'general'],
    default: 'general',
  },
  sourceCampaign: { // Link to the campaign that generated this notification (if any)
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
    required: false,
  },
  // Could add a link to an associated entity (e.g., transactionId, estimateId)
  relatedEntity: {
    id: { type: mongoose.Schema.Types.ObjectId },
    type: { type: String, enum: ['Transaction', 'Estimate', 'User', 'Plan'] },
  }
}, {
  timestamps: true // createdAt will be the 'sent' time
});

module.exports = mongoose.model('Notification', notificationSchema);
