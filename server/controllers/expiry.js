
const User = require("../models/user");

const updateUserPlan = async (req, res) => {
  const { firebaseUID, plan, billingCycle } = req.body;

  try {
    const user = await User.findOne({ firebaseUID });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Set plan name
    user.plan = plan;

    // Calculate expiry based on billing cycle
    const expiryDate = new Date();

    if (billingCycle === "monthly") {
      expiryDate.setDate(expiryDate.getDate() + 30);
    } else if (billingCycle === "yearly") {
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
    } else {
      return res.status(400).json({ message: "Invalid billing cycle" });
    }

    user.planExpiresAt = expiryDate;

    await user.save();
    res.status(200).json({ message: "Plan updated", planExpiresAt: expiryDate });

  } catch (err) {
    console.error("Error updating plan:", err);
    res.status(500).json({ message: "Server error" });
  }
};
