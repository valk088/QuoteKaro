const express = require('express');
const router = express.Router();
const Plan = require('../models/plan');


// GET all plans
// GET /api/plans
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find({}); // Fetch all plans
    res.status(200).json(plans);
  } catch (error) {
    console.error('Error fetching plans:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// POST a new plan
// POST /api/plans
router.post('/', async (req, res) => {
  try {
    // Create a new plan instance with data from request body
    const newPlan = new Plan(req.body);
    // Save the new plan to the database
    const savedPlan = await newPlan.save();
    res.status(201).json(savedPlan); // Respond with the created plan and 201 status
  } catch (error) {
    console.error('Error creating plan:', error);
    // Handle validation errors or other creation issues
    res.status(400).json({ message: 'Failed to create plan', error: error.message });
  }
});

// PUT (full update) an existing plan by ID
// PUT /api/plans/:id
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters
    const updatedPlan = await Plan.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json(updatedPlan); // Respond with the updated plan
  } catch (error) {
    console.error('Error updating plan:', error);
    res.status(400).json({ message: 'Failed to update plan', error: error.message });
  }
});

// PATCH (partial update) a plan by ID (used for isActive and isPopular toggles)
// PATCH /api/plans/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = {};

    // Only allow specific fields to be updated via PATCH for safety
    if (req.body.isActive !== undefined) {
      updateData.isActive = req.body.isActive;
    }
    if (req.body.isPopular !== undefined) {
      updateData.isPopular = req.body.isPopular;
    }

    // If no valid fields to update, return a bad request
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid fields provided for update.' });
    }

    const updatedPlan = await Plan.findByIdAndUpdate(id, updateData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators
    });

    if (!updatedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json(updatedPlan);
  } catch (error) {
    console.error('Error patching plan:', error);
    res.status(400).json({ message: 'Failed to patch plan', error: error.message });
  }
});


// DELETE a plan by ID
// DELETE /api/plans/:id
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deletedPlan = await Plan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res.status(404).json({ message: 'Plan not found' });
    }

    res.status(200).json({ message: 'Plan deleted successfully', deletedPlanId: id });

  } catch (error) {
    console.error('Error deleting plan:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
