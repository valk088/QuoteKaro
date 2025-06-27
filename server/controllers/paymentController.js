const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
const crypto = require('crypto');
const Transaction = require('../models/payments');
const User = require('../models/user');

exports.createOrder = async (req, res) => {
  try {
    const { amount, userId, purpose } = req.body; // amount in rupees

    const options = {
      amount: amount * 1, // convert to paise
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        userId,
        purpose, // "plan" or "topup"
      },
    };

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


exports.verifyPayment = async (req, res) => {
  const {
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    userId,
    type,
    purchasedAmount ,
    credits,
    planName,
    billingCycle,
  } = req.body;

  const amount = purchasedAmount;
  try {
    
    // (Optional) Verify signature for security
    const generated_signature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest('hex');

    if (generated_signature !== razorpay_signature)
      return res.status(400).json({ success: false, message: "Invalid signature" });

    // Save Payment
    await Transaction.create({
      userId,
      paymentGateway: 'razorpay',
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      amount,
      currency: 'INR',
      status: 'success',
      creditsPurchased: credits,
      type,
    });

    // Update User
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false });

    if (type === "subscription") {
      user.plan = planName;
      user.billingCycle = billingCycle;

      const expiry = new Date();
      expiry.setMonth(expiry.getMonth() + (billingCycle === "yearly" ? 12 : 1));
      user.planExpiresAt = expiry;

      user.total_credits = credits;
      user.left_credits =  credits || 0 ; 
      user.left_credits =  credits || 0 ; 
      user.used_credits = 0 ;

    } else {
      user.left_credits += credits;
      user.total_credits += credits;
    }

    await user.save();

    res.status(200).json({ success: true });
  } catch (err) {
    console.error("Payment verification failed", err);
    res.status(500).json({ success: false });
  }
};
