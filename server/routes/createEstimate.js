const express = require("express");
const router = express.Router();
const Estimate = require("../models/estimates");
const User = require("../models/user");
const updateTotalTurnoverForUser = require("../utils/calculateTurnover");
router.post("/create", async (req, res) => {
  try {
    const {
      firebaseUID,
      clientName,
      functionName,
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

    const newEstimate = await Estimate.create({
      userId: user._id,
      clientName,
      functionName,
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
    await updateTotalTurnoverForUser(firebaseUID);

    res.status(201).json({ success: true, estimate: newEstimate });
  } catch (err) {
    console.error("Error creating estimate:", err);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

module.exports = router;
