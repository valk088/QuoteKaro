const express = require('express');
const router = express.Router();
const EmailTemplate = require('../models/EmailTemplate'); // Ensure correct path and model export

// Add a console log here to verify what EmailTemplate is
// console.log("EmailTemplate after require in routes:", typeof EmailTemplate, EmailTemplate);

// GET all email templates
router.get('/', async (req, res) => {
  try {
    const templates = await EmailTemplate.find({});
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error('Error fetching email templates:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// GET a single email template by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const template = await EmailTemplate.findById(id);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Email template not found' });
    }
    res.status(200).json({ success: true, template });
  } catch (error) {
    console.error('Error fetching email template by ID:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// POST create a new email template
router.post('/', async (req, res) => {
  try {
    const newTemplate = new EmailTemplate(req.body);
    const savedTemplate = await newTemplate.save();
    res.status(201).json({ success: true, template: savedTemplate });
  } catch (error) {
    console.error('Error creating email template:', error);
    res.status(400).json({ success: false, message: 'Failed to create email template', error: error.message });
  }
});

// PUT update an email template by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTemplate = await EmailTemplate.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedTemplate) {
      return res.status(404).json({ success: false, message: 'Email template not found' });
    }
    res.status(200).json({ success: true, template: updatedTemplate });
  } catch (error) {
    console.error('Error updating email template:', error);
    res.status(400).json({ success: false, message: 'Failed to update email template', error: error.message });
  }
});

// DELETE an email template by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTemplate = await EmailTemplate.findByIdAndDelete(id);
    if (!deletedTemplate) {
      return res.status(404).json({ success: false, message: 'Email template not found' });
    }
    res.status(200).json({ success: true, message: 'Email template deleted successfully' });
  } catch (error) {
    console.error('Error deleting email template:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
