const express = require("express");
const router = express.Router();
const Estimate = require("../models/estimates");
const User = require("../models/user");
const updateUserStats = require("../utils/calculateUserStats");

router.put("/edit/:id", async (req, res) => {
  const { id } = req.params;
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
      message: "Your subscription plan has expired. Please renew to continue.",
    });
  }
  // 🔓 Optionally: Un-suspend user if they were suspended but now have a valid plan
  if (user.isSuspended) {
    user.isSuspended = false;
    await user.save();
  }
  if (!firebaseUID) {
    return res
      .status(400)
      .json({ success: false, message: "Missing firebaseUID" });
  }

  try {
    const existingEstimate = await Estimate.findById(id);
    if (!existingEstimate) {
      return res
        .status(404)
        .json({ success: false, message: "Estimate not found" });
    }

    const updated = await Estimate.findByIdAndUpdate(
      id,
      {
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
      },
      { new: true }
    );

    await updateUserStats(firebaseUID, "update");

    res.status(200).json({ success: true, estimate: updated });
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ success: false, message: "Internal error" });
  }
});

module.exports = router;
