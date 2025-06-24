const express = require('express');
const router = express.Router();
const EstimateTemplate = require('../models/estimateTemplates'); // Import the new model

// GET all estimate templates
router.get('/', async (req, res) => {
  try {
    const templates = await EstimateTemplate.find({ isActive: true }).sort({ plan: 1, name: 1 }); // Fetch active templates, sort by plan then name
    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error('Error fetching estimate templates:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

// You might also want admin routes for creating, updating, deleting templates (optional for now)
/*
// POST create new template
router.post('/', async (req, res) => { ... });
// PUT update template by ID
router.put('/:id', async (req, res) => { ... });
// DELETE template by ID
router.delete('/:id', async (req, res) => { ... });
*/

module.exports = router;
