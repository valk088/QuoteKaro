const mongoose = require('mongoose');

const emailTemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  subject: {
    type: String,
    required: true,
    trim: true,
  },
  body: { // HTML content of the email
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  placeholders: [{ // List of dynamic data placeholders (e.g., {{userName}}, {{credits}})
    type: String,
  }],
}, {
  timestamps: true // createdAt and updatedAt
});

module.exports = mongoose.model('EmailTemplate', emailTemplateSchema);
