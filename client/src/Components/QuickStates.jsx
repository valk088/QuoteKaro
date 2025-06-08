import React from "react";
import { 
  TrendingUp,
  TrendingDown,
  Zap,
  FileText,
  Users,
  DollarSign,
  
} from 'lucide-react';
function QuickStates() {

    const studioData = {
    name: "Creative Studio Pro",
    credits: 125,
    plan: "Premium",
    profileComplete: false,
    currentTheme: "Modern Purple"
  };

  const quickStats = [
    {
      title: "Total Estimates",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: FileText,
      color: "blue",
    },
    {
      title: "Total Clients",
      value: "89",
      change: "+8%",
      trend: "up",
      icon: Users,
      color: "green",
    },
    {
      title: "Credits Left",
      value: studioData.credits,
      change: "-15",
      trend: "down",
      icon: Zap,
      color: "yellow",
    },
    {
      title: "This Month",
      value: "₹2,45,000",
      change: "+23%",
      trend: "up",
      icon: DollarSign,
      color: "purple",
    },
  ];

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const colorClasses = {
      blue: "bg-blue-50 border-blue-100 text-blue-600",
      green: "bg-green-50 border-green-100 text-green-600",
      yellow: "bg-yellow-50 border-yellow-100 text-yellow-600",
      purple: "bg-purple-50 border-purple-100 text-purple-600",
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
            <Icon size={24} />
          </div>
          <div
            className={`flex items-center gap-1 text-sm ${
              stat.trend === "up" ? "text-green-600" : "text-red-600"
            }`}
          >
            {stat.trend === "up" ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {stat.change}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
        <p className="text-gray-600 text-sm">{stat.title}</p>
      </div>
    );
  };
  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <StatCard key={index} stat={stat} />
        ))}
      </div>
    </div>
  );
}

export default QuickStates;
