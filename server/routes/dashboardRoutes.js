const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Your provided User model
const Estimate = require('../models/estimates'); // Your provided Estimate model
const Transaction = require('../models/payments'); // Your provided Transaction model (from Payment.js)
const mongoose = require('mongoose'); // For ObjectId usage if needed (though less critical with string plan)

// Helper functions to get start of periods (ensure these align with your server's timezone or data's timezone)
const getStartOfDay = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0); // Use UTC to avoid timezone issues with MongoDB's UTC storage
  return d;
};
const getStartOfWeek = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(d.getUTCDate() - (d.getUTCDay() === 0 ? 6 : d.getUTCDay() - 1)); // Adjust for UTC Monday start
  return d;
};
const getStartOfMonth = () => {
  const d = new Date();
  d.setUTCHours(0, 0, 0, 0);
  d.setUTCDate(1); // Set to the 1st of the month
  return d;
};
const getStartOfLastMonth = () => {
  const d = new Date();
  d.setUTCMonth(d.getUTCMonth() - 1);
  d.setUTCDate(1);
  d.setUTCHours(0, 0, 0, 0);
  return d;
};

// GET dashboard overview statistics
router.get('/', async (req, res) => {
  try {
    const now = new Date(); // Current time (UTC by default if not specified)
    const last30Days = new Date(now);
    last30Days.setUTCDate(now.getUTCDate() - 30);
    const last7Days = new Date(now);
    last7Days.setUTCDate(now.getUTCDate() - 7);
    const last14Days = new Date(now);
    last14Days.setUTCDate(now.getUTCDate() - 14);

    // --- User Statistics ---
    const totalUsers = await User.countDocuments({});
    const activeUsers = await User.countDocuments({ isSuspended: false }); // Based on your User model
    const suspendedUsers = await User.countDocuments({ isSuspended: true }); // Based on your User model

    // Users with less than 10 credits (using 'left_credits' from your User model)
    const lowCreditUsers = await User.countDocuments({ left_credits: { $lt: 10 } });

    // Plans expired before now (using 'planExpiresAt' from your User model)
    const expiredPlans = await User.countDocuments({ planExpiresAt: { $lt: now, $ne: null } });

    // New signups in the last 7 days (using 'joinedAt' from your User model)
    const newSignupsLast7d = await User.countDocuments({ joinedAt: { $gte: last7Days } });

    // New signups in the previous 7 days (from 14 days ago to 7 days ago) for trend calculation
    const newSignupsPrev7d = await User.countDocuments({
      joinedAt: { $gte: last14Days, $lt: last7Days }
    });
    // Calculate trend: (current_period - previous_period) / previous_period * 100
    const newSignupsTrend = newSignupsPrev7d > 0 ? ((newSignupsLast7d - newSignupsPrev7d) / newSignupsPrev7d * 100).toFixed(2) : (newSignupsLast7d > 0 ? 100 : 0);


    // --- Revenue Statistics ---
    // Sum of 'amount' from 'success' transactions (subscription or one-time) within the last 30 days
    const revenueLast30dResult = await Transaction.aggregate([
      { $match: { createdAt: { $gte: last30Days }, status: 'success', type: { $in: ['subscription', 'one-time'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const revenueLast30d = revenueLast30dResult.length > 0 ? revenueLast30dResult[0].totalRevenue : 0;

    // Sum of 'amount' from all time 'success' transactions (subscription or one-time)
    const allTimeRevenueResult = await Transaction.aggregate([
      { $match: { status: 'success', type: { $in: ['subscription', 'one-time'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const allTimeRevenue = allTimeRevenueResult.length > 0 ? allTimeRevenueResult[0].totalRevenue : 0;

    // To calculate revenue trend, we need previous 30 days data.
    const prev30DaysStart = new Date(last30Days);
    prev30DaysStart.setUTCDate(prev30DaysStart.getUTCDate() - 30);
    const revenuePrev30dResult = await Transaction.aggregate([
      { $match: { createdAt: { $gte: prev30DaysStart, $lt: last30Days }, status: 'success', type: { $in: ['subscription', 'one-time'] } } },
      { $group: { _id: null, totalRevenue: { $sum: '$amount' } } }
    ]);
    const revenuePrev30d = revenuePrev30dResult.length > 0 ? revenuePrev30dResult[0].totalRevenue : 0;
    const revenueTrend = revenuePrev30d > 0 ? ((revenueLast30d - revenuePrev30d) / revenuePrev30d * 100).toFixed(2) : (revenueLast30d > 0 ? 100 : 0);


    // --- Credits Statistics ---
    // Total credits used: Fetch from User.used_credits
    const totalUsedCreditsResult = await User.aggregate([
      { $group: { _id: null, totalUsed: { $sum: '$used_credits' } } }
    ]);
    const creditsUsed = totalUsedCreditsResult.length > 0 ? totalUsedCreditsResult[0].totalUsed : 0;


    // Total credits bought: Sum 'creditsPurchased' from successful transactions
    const creditsBoughtResult = await Transaction.aggregate([
      { $match: { status: 'success', creditsPurchased: { $exists: true, $ne: null } } }, // Only transactions that include creditsPurchased
      { $group: { _id: null, totalCreditsBought: { $sum: '$creditsPurchased' } } }
    ]);
    const creditsBought = creditsBoughtResult.length > 0 ? creditsBoughtResult[0].totalCreditsBought : 0;


    // --- Estimate Statistics ---
    const startOfMonth = getStartOfMonth();
    // Estimates created this month
    const estimatesThisMonth = await Estimate.countDocuments({ createdAt: { $gte: startOfMonth } });

    const startOfLastMonth = getStartOfLastMonth();
    // Estimates created last month (for trend calculation)
    const estimatesLastMonth = await Estimate.countDocuments({
      createdAt: { $gte: startOfLastMonth, $lt: startOfMonth }
    });
    // Trend calculation
    const estimatesTrend = estimatesLastMonth > 0 ? ((estimatesThisMonth - estimatesLastMonth) / estimatesLastMonth * 100).toFixed(2) : (estimatesThisMonth > 0 ? 100 : 0);

    // --- Popular Plans ---
    // Group by User.plan (which is a string like "Stater", "Premium")
    const popularPlans = await User.aggregate([
      { $match: { plan: { $exists: true, $ne: null } } }, // Only users with an assigned plan (string)
      {
        $group: {
          _id: '$plan', // Group by the plan string
          users: { $sum: 1 } // Count users per plan
        }
      },
      {
        $project: {
          _id: 0,
          name: '$_id', // The name is the grouped _id string
          users: '$users'
        }
      },
      { $sort: { users: -1 } }, // Sort by user count (most popular first)
      { $limit: 3 } // Get top 3
    ]);

    const dashboardStats = {
      totalUsers: {
        active: activeUsers,
        suspended: suspendedUsers,
        total: totalUsers,
      },
      revenue: {
        last30d: revenueLast30d,
        allTime: allTimeRevenue,
        trend: parseFloat(revenueTrend),
      },
      estimates: {
        thisMonth: estimatesThisMonth,
        trend: parseFloat(estimatesTrend),
      },
      credits: {
        used: creditsUsed,
        bought: creditsBought,
      },
      lowCreditUsers: lowCreditUsers,
      expiredPlans: expiredPlans,
      newSignups: {
        last7d: newSignupsLast7d,
        trend: parseFloat(newSignupsTrend),
      },
      popularPlans: popularPlans,
    };

    res.status(200).json({ success: true, dashboardStats });
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
});

module.exports = router;
