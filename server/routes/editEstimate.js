const express = require("express");
const router = express.Router();
const Estimate = require("../models/estimates");
const User = require("../models/user");
const updateUserStats = require("../utils/calculateUserStats");

router.put('/edit/:id', async (req, res) => {
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

  if (!firebaseUID) {
    return res.status(400).json({ success: false, message: 'Missing firebaseUID' });
  }

  try {
    const existingEstimate = await Estimate.findById(id);
    if (!existingEstimate) {
      return res.status(404).json({ success: false, message: 'Estimate not found' });
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