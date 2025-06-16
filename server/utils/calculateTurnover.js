const Estimate = require("../models/estimates");
const User = require("../models/user");

const updateTotalTurnoverForUser = async (firebaseUID) => {
  try {
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      console.log("User not found in turnover update");
      return;
    }

    const estimates = await Estimate.find({
      userId: user._id,
      status: "draft",
    });

    const total = estimates.reduce((sum, est) => sum + (est.netTotal || 0), 0);

    await User.findByIdAndUpdate(user._id, { totalturnover: total });
  } catch (err) {
    console.error("❌ Error in updateTotalTurnoverForUser:", err);
  }
};

module.exports = updateTotalTurnoverForUser;
