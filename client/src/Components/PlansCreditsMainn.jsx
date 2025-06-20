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

const PlansCreditsMainn = () => {
  
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [activeTab, setActiveTab] = useState("plans");
  const [subscriptionPlans, setSubscriptionPlans] = useState([]); 
  const [creditPlans, setCreditPlans] = useState([]); 

   useEffect(() => {
    const fetchPlans = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/plans`
        );
        const allPlans = res.data;
        
        // Filter plans into subscription and one-time credits
        setSubscriptionPlans(allPlans.filter((p) => p.type === "subscription"));
        setCreditPlans(allPlans.filter((p) => p.type === "one-time"));
      } catch (err) {
        console.error("Failed to fetch plans:", err);

        
      }
    };

    fetchPlans();
  }, []);

  const getPrice = (plan) => {
    return billingCycle === "monthly" ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavingsPercent = (plan) => {
    if (billingCycle === "yearly" && plan.monthlyPrice && plan.yearlyPrice) {
      return Math.round(
        ((plan.monthlyPrice * 12 - plan.yearlyPrice) /
          (plan.monthlyPrice * 12)) *
          100
      );
    }
    return 0; 
  };
  
  const { userData, loading } = useUser();
  if (loading || !userData) return null;
  const USER = userData;
  

  const usageStats = [
    {
      label: "Estimates Created",
      value: USER.total_estimates,
      icon: FileText,
      color: "text-blue-600",
    },
    { label: "Clients Served", value: 89, icon: Mail, color: "text-green-600" },
    {
      label: "Revenue Generated",
      value: USER.totalturnover,
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      label: "Conversion Rate",
      value: "68%",
      icon: BarChart3,
      color: "text-pink-600",
    },
  ]

  
  
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto z-0">
      {/* Header */}
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
                {USER.plan}
              </span>
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  USER.isSuspended === false
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {USER.isSuspended === false
                  ? "active"
                  : "inactive"}
              </span>
            </div>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:shadow-lg transition-all">
            <RefreshCw className="w-4 h-4" />
            Upgrade Plan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Credits Usage */}
          <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
            <div className="flex items-center justify-between mb-4">
              <Zap className="w-8 h-8" />
              <span className="text-sm opacity-90">Credits</span>
            </div>
            <div className="mb-2">
              <span className="text-3xl font-bold">
                {USER.used_credits}
              </span>
              <span className="text-lg opacity-90">
                /{USER.total_credits}
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div
                className="bg-white rounded-full h-2 transition-all duration-500"
                style={{
                  width: `${
                    (USER.used_credits / USER.total_credits) * 100
                  }%`,
                }}
              ></div>
            </div>
            <span className="text-sm opacity-90">
              {USER.left_credits} credits
              remaining
            </span>
          </div>

          {/* Renewal Date */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="w-8 h-8 text-blue-500" />
              <span className="text-sm text-gray-500">Next Billing</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">
              {new Date(USER.planExpiresAt).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="text-sm text-gray-600">Auto-renewal enabled</div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="w-8 h-8 text-green-500" />
              <span className="text-sm text-gray-500">This Month</span>
            </div>
            <div className="text-2xl font-bold text-gray-800 mb-2">{USER.total_estimates}</div>
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
                  Save 20%
                </span>
              </button>
            </div>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => (
              <div
                key={plan._id} // Use plan._id from MongoDB
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
                      ${getPrice(plan)}
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
                        {plan.credits} credits/month
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
                    className={`w-full py-4 rounded-2xl font-semibold transition-all flex items-center justify-center gap-2 group ${
                      USER.plan === plan.name
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed" // Style for current plan
                        : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                    }`}
                    disabled={USER.plan === plan.name} // Disable if it's the current plan
                  >
                    {USER.name === plan.name
                      ? "Current Plan"
                      : "Choose Plan"}
                    {USER.name !== plan.name && (
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
                key={pkg._id} // Use pkg._id from MongoDB
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
                    <span className="text-3xl font-bold text-gray-800">
                      {pkg.credits}
                    </span>
                    {pkg.bonusCredits > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        +{pkg.bonusCredits} bonus credits
                      </div>
                    )}
                  </div>

                  {/* Assuming monthlyPrice is used for one-time credit price */}
                  <div className="text-2xl font-bold text-purple-600 mb-6">
                    ${pkg.monthlyPrice}
                  </div>

                  <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl font-semibold hover:shadow-lg transition-all">
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

          {/* Usage Chart Placeholder */}
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
