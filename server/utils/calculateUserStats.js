const Estimate = require('../models/estimates');
const User = require('../models/user');

const updateUserStats = async (firebaseUID , action = "create") => {
  try {
    const user = await User.findOne({ firebaseUID });
    if (!user) {
      console.log("User not found");
      return;
    }

    const userId = user._id;

    
    const confirmedEstimates = await Estimate.find({
      userId,
      status: 'draft',
    });

    // Total Turnover
    const totalTurnover = confirmedEstimates.reduce((sum, estimate) => sum + (estimate.netTotal || 0), 0);

    //  Total Estimates
    const totalEstimates = await Estimate.countDocuments({ userId });

    // 👤 Total Unique Clients
    const allClientNames = await Estimate.find({ userId }).distinct("clientName");
    const totalClients = allClientNames.length;

    //  Credit logic
    let usedDelta = 0;
    if (action === "create") usedDelta = 2;
    else if (action === "update") usedDelta = 0.5;

    const CreditUsed = (user.used_credits || 0) + usedDelta;
    const CreditLeft = user.total_credits  - CreditUsed ;



    // ✅ Update User document
    user.totalturnover = totalTurnover;
    user.total_estimates = totalEstimates;
    user.total_clients = totalClients;
    user.used_credits = CreditUsed,
    user.left_credits  = CreditLeft,
    await user.save();

    console.log("✅ User stats updated: ", {
      totalTurnover,
      totalEstimates,
      totalClients,
      CreditUsed,
      CreditLeft
    });

  } catch (error) {
    console.error("Error updating user stats:", error);
  }
};

module.exports = updateUserStats;
