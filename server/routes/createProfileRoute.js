const express = require('express');
const router = express.Router();
const User = require('../models/user');

// ----------------------------------------------
// ✅ CREATE or UPDATE USER PROFILE
// POST /api/users/create-profile
router.post('/create-profile', async (req, res) => {
  const {
    email,
    phone,
    firebaseUID,
    studioName,
    caption,
    logoUrl,
    website,
    phone2,
    socialLinks,
    address,
    policies,
    notes
  } = req.body;

  if (!email || !firebaseUID) {
    return res.status(400).json({ message: "email and firebaseUID are required" });
  }

  try {
    let user = await User.findOne({ firebaseUID });

    if (user) {
      // Update existing profile
      user.email = email;
      user.phone = phone;
      user.studioName = studioName;
      user.caption = caption;
      user.logoUrl = logoUrl;
      user.website = website;
      user.phone2 = phone2;
      user.socialLinks = socialLinks;
      user.address = address;
      user.policies = policies;
      user.notes = notes;

      await user.save();
      return res.json({ message: "Profile updated", user });
    }

    // Create new profile
    const newUser = new User({
      email,
      phone,
      firebaseUID,
      studioName,
      caption,
      logoUrl,
      website,
      phone2,
      socialLinks,
      address,
      policies,
      notes
    });

    await newUser.save();
    return res.status(201).json({ message: "Profile created", user: newUser });

  } catch (error) {
    console.error("❌ Error creating/updating profile:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ----------------------------------------------
// ✅ GET FULL PROFILE DATA
// GET /api/users/get-profile/:firebaseUID
router.get('/get-profile/:firebaseUID', async (req, res) => {
  const { firebaseUID } = req.params;

  try {
    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res.status(404).json({ message: "Profile not found" });
    }

    return res.json({ user });
  } catch (err) {
    console.error("❌ Error fetching profile:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




module.exports = router;
