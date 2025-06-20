const express = require("express");
const router = express.Router();
const Estimate = require("../models/estimates");
const User = require("../models/user");

// get all estimate
router.get("/get/:firebaseUID", async (req, res) => {
  try {
    const { firebaseUID } = req.params;

    if (!firebaseUID) {
      return res
        .status(400)
        .json({ success: false, message: "firebaseUID is required" });
    }

    const user = await User.findOne({ firebaseUID });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const estimates = await Estimate.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ success: true, estimates });
  } catch (err) {
    console.error("Error fetching estimates:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// get estimate by ID
router.get("/get-by-id/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const estimate = await Estimate.findById(id);

    if (!estimate) {
      return res
        .status(400)
        .json({ success: false, message: "Estimate not found" });
    }

    res.status(200).json({ success: true, estimate });
  } catch (err) {
    console.error("❌ Error fetching estimate by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});
module.exports = router;
