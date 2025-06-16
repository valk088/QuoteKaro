const express = require('express');
const router = express.Router();
const Estimate = require('../models/estimates'); 
const User = require('../models/user'); 

router.get('/get/:firebaseUID', async (req, res) => {
  try {
    const { firebaseUID } = req.params;

    if (!firebaseUID) {
      return res.status(400).json({ success: false, message: 'firebaseUID is required' });
    }

    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const estimates = await Estimate.find({ userId: user._id }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, estimates });
    
  } catch (err) {
    console.error('Error fetching estimates:', err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
