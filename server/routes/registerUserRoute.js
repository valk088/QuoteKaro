const express = require( 'express');
const User =  require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    
  const { firebaseUID, studioName, email } = req.body;

  if (!firebaseUID || !studioName || !email) {
    return res.status(400).json({ message: "All fields required." });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ firebaseUID });

    if (user) {
      return res.status(200).json({ message: "User already exists", user });
    }
    
    user = new User({ firebaseUID, studioName, email });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports= router;
