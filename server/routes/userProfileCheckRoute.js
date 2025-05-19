// routes/userProfileRoute.js
const express = require('express');
const router = express.Router();
const User = require('../models/user'); 

router.get('/:firebaseUID', async (req, res) => {
  const { firebaseUID } = req.params;
  
  try {
    const user = await User.findOne({ firebaseUID });
    

    if (!user) {
      return res.status(404).json({ profileComplete: false, message: "User not found" });
    }

    const profileComplete = !!(user.phone); // adjust fields if needed
    return res.json({ profileComplete });
  } catch (err) {
    console.error("❌ Error checking profile:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
