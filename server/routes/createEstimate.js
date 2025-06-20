const express = require("express");
const router = express.Router();
const Estimate = require("../models/estimates");
const User = require("../models/user");
const updateUserStats = require("../utils/calculateUserStats");
router.post("/create", async (req, res) => {
  try {
    const {
      firebaseUID,
      clientName,
      functionName,
      phoneNumber,
      date,
      status,
      services,
      themeId,
      subtotal,
      discount,
      discountType,
      netTotal,
      notes,
      startDate,
      endDate,
      location,
      description,
    } = req.body;

    const user = await User.findOne({ firebaseUID });
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const isPlanExpired = (user) => {
      if (!user.planExpiresAt) return true; // no expiry = expired
      return new Date(user.planExpiresAt) < new Date(); // if past date
    };

    if (isPlanExpired(user)) {
      // 🔒 Suspend access in DB (only if not already suspended)
      if (!user.isSuspended) {
        user.isSuspended = true;
        await user.save();
      }

      return res.status(403).json({
        message:
          "Your subscription plan has expired. Please renew to continue.",
      });
    }
    // 🔓 Optionally: Un-suspend user if they were suspended but now have a valid plan
    if (user.isSuspended) {
      user.isSuspended = false;
      await user.save();
    }

    const newEstimate = await Estimate.create({
      userId: user._id,
      clientName,
      functionName,
      phoneNumber,
      location,
      description,
      notes,
      startDate,
      endDate,
      services,
      netTotal,
      date: new Date(date),
      status,
      themeId,
      notes,
      subtotal,
      discount,
      discountType,
    });
    await newEstimate.save();
    await updateUserStats(firebaseUID, "create");

    res.status(201).json({ success: true, estimate: newEstimate });
  } catch (err) {
    console.error("Error creating estimate:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
