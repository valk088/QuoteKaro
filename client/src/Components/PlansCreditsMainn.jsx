import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Zap,
  Star,
  Check,
  ArrowRight,
  TrendingUp,
  Calendar,
  Download,
  Mail,
  Phone,
  FileText,
  Crown,
  Sparkles,
  BarChart3,
  RefreshCw,
} from "lucide-react";
import axios from "axios";
import WelcomeSection from "./WelcomeSection";
import { useUser } from "../context/UserContext";
import { toast } from "react-hot-toast"; // Don't forget to import toast

const PlansCreditsMainn = () => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activeTab, setActiveTab] = useState("plans");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [creditPlans, setCreditPlans] = useState([]);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false); // New state to track Razorpay script

  const { userData, loading, refresh } = useUser();

  // Effect to load Razorpay script
  useEffect(() => {
    const loadRazorpayScript = () => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = () => {
        setRazorpayLoaded(true); // Set state to true when script is loaded
      };
      script.onerror = () => {
        console.error("Failed to load Razorpay SDK script.");
        toast.error("Failed to load payment gateway. Please refresh.");
      };
      document.body.appendChild(script);
    };

    if (!window.Razorpay) { // Only load if not already present
      loadRazorpayScript();
    } else {
      setRazorpayLoaded(true); // If already present (e.g., component re-mounts)
    }

    // Cleanup function (optional, but good practice if needed for unmounting)
    // return () => {
    //   if (script && document.body.contains(script)) {
    //     document.body.removeChild(script);
    //   }
    // };
  }, []); // Run once on component mount

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/plans`
        );
        const allPlans = res.data;

        setSubscriptionPlans(allPlans.filter((p) => p.type === "subscription"));
        setCreditPlans(allPlans.filter((p) => p.type === "one-time"));
      } catch (err) {
        console.error("Failed to fetch plans:", err);
        toast.error("Failed to fetch plans. Please try again.");
      }
    };

    fetchPlans();
  }, []);

  const getPrice = (plan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavingsPercent = (plan) => {
    if (billingCycle === "yearly" && plan.monthlyPrice && plan.yearlyPrice) {
      const monthlyCostPerYear = plan.monthlyPrice * 12;
      return Math.round(
        ((monthlyCostPerYear - plan.yearlyPrice) / monthlyCostPerYear) * 100
      );
    }
    return 0;
  };

  if (loading || !userData) {
    return (
      <div className="flex-1 p-4 md:p-8 flex items-center justify-center text-gray-600">
        Loading user data and plans...
      </div>
    );
  }

  const USER = userData;

  const usageStats = [
    {
      label: "Estimates Created",
      value: USER.total_estimates || 0,
      icon: FileText,
      color: "text-blue-600",
    },
    { label: "Clients Served", value: USER.total_clients || 0, icon: Mail, color: "text-green-600" },
    {
      label: "Revenue Generated",
      value: USER.total_turnover ? `$${USER.total_turnover.toFixed(2)}` : "$0.00",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Conversion Rate",
      value: USER.conversion_rate ? `${USER.conversion_rate}%` : "0%",
      icon: BarChart3,
      color: "text-pink-600",
    },
  ];

  const handleBuy = async (planDetails) => {
    if (!razorpayLoaded) {
      toast.error("Payment gateway not loaded yet. Please wait a moment.");
      return;
    }

    if (!USER._id) {
      toast.error("User not logged in. Please log in to make a purchase.");
      return;
    }

    const userId = USER._id;
    const amountInPaise = Math.round(planDetails.amount * 100);

    try {
      const orderRes = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/payments/create-order`,
        {
          amount: amountInPaise,
          userId,
          purpose: planDetails.type,
          planName: planDetails.name,
          billingCycle: planDetails.cycle,
        }
      );

      const { order } = orderRes.data;

      // Ensure window.Razorpay exists before using it
      if (!window.Razorpay) {
        toast.error("Razorpay script is not available. Please try again.");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "QuoteKaro",
        description: `Purchase: ${planDetails.name}`,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/payments/verify`, {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
              razorpay_signature: response.razorpay_signature,
              userId: userId,
              planId: planDetails._id,
              type: planDetails.type,
              purchasedAmount: planDetails.amount,
              credits: planDetails.credits,
              planName: planDetails.name,
              billingCycle: planDetails.cycle,
            });

            if (verifyRes.data.success) {
                toast.success("Payment successful ✅ and plan updated!");
                refresh();
            } else {
                toast.error("Payment verification failed. Please contact support.");
            }
          } catch (error) {
            console.error("Error during payment verification:", error);
            toast.error("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
            name: USER.name,
            email: USER.email,
            contact: USER.phoneNumber,
        },
        theme: { color: "#7c3aed" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      console.error("Error creating Razorpay order:", error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(`Error: ${error.response.data.message}`);
      } else {
        toast.error("Failed to initiate payment. Please try again.");
      }
    }
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto z-0">
      <WelcomeSection name="Plan-Credits" />

      {/* Current Plan Overview */}
      <div className="bg-white/80 backdrop-blur-xl z-10 md:z-20 relative rounded-3xl shadow-xl border border-white/50 p-8 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Current Plan
            </h2>
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5 text-yellow-500" />
              <span className="text-lg font-semibold text-purple-600">
                {USER.plan || "N/A"}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  USER.isSuspended === false
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {USER.isSuspended === false ? "active" : "inactive"}
              </span>
            </div>
          </div>
          <button
            onClick={() => setActiveTab("plans")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Upgrade Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8" />
              <span className="text-sm opacity-90">Credits</span>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold">{USER.used_credits || 0}</span>
              <span className="text-lg opacity-90">/{USER.total_credits || 0}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{
                  width: `${USER.total_credits > 0 ? (USER.used_credits / USER.total_credits) * 100 : 0}%`,
                }}
              ></div>
            </div>
            <span className="text-sm opacity-90">
              {(USER.total_credits - USER.used_credits) || 0} credits remaining
            </span>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-500">Next Billing</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {USER.planExpiresAt
                ? new Date(USER.planExpiresAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })
                : "N/A"}
            </div>
            <div className="text-sm text-gray-600">
              {USER.planExpiresAt ? "Auto-renewal enabled" : "No active plan"}
            </div>
          </div>

          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {USER.total_estimates || 0}
            </div>
            <div className="text-sm text-gray-600">Estimates created</div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex bg-white/80 backdrop-blur-xl rounded-2xl p-2 mb-8 border border-white/50">
        {[
          { id: "plans", label: "Subscription Plans", icon: Star },
          { id: "credits", label: "Buy Credits", icon: Zap },
          { id: "usage", label: "Usage Analytics", icon: BarChart3 },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl transition-all ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === "plans" && (
        <div>
          {/* Billing Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-2 border border-white/50">
              <button
                onClick={() => setBillingCycle("monthly")}
                className={`px-6 py-2 rounded-xl transition-all ${
                  billingCycle === "monthly"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle("yearly")}
                className={`px-6 py-2 rounded-xl transition-all ${
                  billingCycle === "yearly"
                    ? "bg-purple-500 text-white shadow-lg"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Yearly
                <span className="ml-2 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs">
                  Save {getSavingsPercent(subscriptionPlans.find(p => p.isPopular)) || "20"}%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan._id}
                className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 transition-all hover:scale-105 ${
                  plan.isPopular
                    ? "border-purple-300 ring-4 ring-purple-100"
                    : "border-white/50"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <div
                    className={`w-16 h-16 bg-gradient-to-br ${
                      plan.color || "from-blue-500 to-cyan-500"
                    } rounded-2xl flex items-center justify-center mb-6`}
                  >
                    <Crown className="w-8 h-8 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-800">
                      ₹{getPrice(plan)}
                    </span>
                    <span className="text-gray-600">
                      /{billingCycle === "monthly" ? "month" : "year"}
                    </span>
                    {billingCycle === "yearly" &&
                      getSavingsPercent(plan) > 0 && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {getSavingsPercent(plan)}% annually
                        </div>
                      )}
                  </div>

                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="font-semibold">
                        {plan.credits} estimates/month
                      </span>
                    </div>

                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() =>
                      handleBuy({
                        _id: plan._id,
                        name: plan.name,
                        amount: getPrice(plan),
                        credits: plan.credits,
                        type: "subscription",
                        cycle: billingCycle,
                      })
                    }
                    className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 group ${
                      USER.plan === plan.name && USER.billingCycle === billingCycle
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                    }`}
                    disabled={USER.plan === plan.name && USER.billingCycle === billingCycle || !razorpayLoaded}
                  >
                    {USER.plan === plan.name && USER.billingCycle === billingCycle ? "Current Plan" : "Choose Plan"}
                    {!(USER.plan === plan.name && USER.billingCycle === billingCycle) && (
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "credits" && (
        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Buy Additional Credits
            </h2>
            <p className="text-gray-600">
              Top up your account when you need extra estimates
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {creditPlans.map((pkg) => (
              <div
                key={pkg._id}
                className={`relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border-2 transition-all hover:scale-105 ${
                  pkg.isPopular
                    ? "border-purple-300 ring-4 ring-purple-100"
                    : "border-white/50"
                }`}
              >
                {pkg.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Best Value
                    </div>
                  </div>
                )}

                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>

                  <div className="mb-4">
                    <span className="text-3xl font-bold">
                      {pkg.credits} estimates
                    </span>
                    {pkg.bonusCredits > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        +{pkg.bonusCredits} bonus credits
                      </div>
                    )}
                  </div>

                  <div className="text-2xl font-bold text-purple-600 mb-6">
                    ₹{pkg.monthlyPrice}
                  </div>

                  <button
                    onClick={() =>
                      handleBuy({
                        _id: pkg._id,
                        name: pkg.name,
                        amount: pkg.monthlyPrice,
                        credits: pkg.credits + (pkg.bonusCredits || 0),
                        type: "one-time",
                      })
                    }
                    className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all"
                    disabled={!razorpayLoaded} // Disable if Razorpay is not loaded
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "usage" && (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {usageStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-white/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`w-8 h-8 ${stat.color}`} />
                    <Sparkles className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="text-2xl font-bold text-gray-800 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              );
            })}
          </div>

          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 p-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">
              Credit Usage Over Time
            </h3>
            <div className="h-64 bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Usage analytics chart would go here
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlansCreditsMainn;