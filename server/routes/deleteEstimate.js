const express = require("express");
const router = express.Router();
const Estimate = require("../models/estimates");
const User = require("../models/user");

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // 1. Delete the estimate
    const estimate = await Estimate.findByIdAndDelete(id);
    if (!estimate) {
      return res.status(404).json({ success: false, message: "Estimate not found" });
    }

    // 2. Find user by Mongo _id (stored in estimate.userId)
    const user = await User.findById(estimate.userId);

    if (user) {
      // 3. Update user stats
      user.total_estimates = Math.max(0, user.total_estimates - 1);
      user.totalturnover = Math.max(0, user.totalturnover - (estimate.netTotal || 0));

      // 4. Only reduce client count if this client has no other estimate
      const otherEstimates = await Estimate.find({
        userId: estimate.userId,
        clientName: estimate.clientName,
      });

      if (otherEstimates.length === 0) {
        user.total_clients = Math.max(0, user.total_clients - 1);
      }

      await user.save();
    }

    return res.json({ success: true, message: "Estimate deleted successfully" });
  } catch (err) {
    console.error("Delete Estimate Error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
