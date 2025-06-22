import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LayoutDashboard, Users, CreditCard, BarChart3, DollarSign, AlertTriangle } from 'lucide-react';

// Import sub-components
import StatCard from './StatCard';
import AlertCards from './AlertCards';
import PopularPlansCard from './PopularPlansCard';

const DashboardOverview = ({ API_BASE_URL }) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${API_BASE_URL}/api/dashboard`);
        setDashboardStats(response.data.dashboardStats);
      } catch (err) {
        console.error("Error fetching dashboard stats:", err);
        setError("Failed to load dashboard data. Please check server connection.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, [API_BASE_URL]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-white text-xl">
        <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Loading Dashboard Data...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64 text-red-500 text-xl">
        <AlertTriangle className="mr-3" size={24} />
        {error}
      </div>
    );
  }

  if (!dashboardStats) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 text-xl">
        No dashboard data available.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-gray-400 mt-1">Welcome back! Here's what's happening with your platform.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
            Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={dashboardStats.totalUsers.total.toLocaleString()}
          subtitle={`${dashboardStats.totalUsers.active} active • ${dashboardStats.totalUsers.suspended} suspended`}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Revenue (30d)"
          value={`₹${(dashboardStats.revenue.last30d ).toFixed(1)}`}
          subtitle={`₹${(dashboardStats.revenue.allTime ).toFixed(0)} all time`}
          trend={dashboardStats.revenue.trend !== undefined ? dashboardStats.revenue.trend : 0} // Add trend to backend
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Estimates Created"
          value={dashboardStats.estimates.thisMonth.toLocaleString()}
          subtitle="This month"
          trend={dashboardStats.estimates.trend}
          icon={BarChart3}
          color="purple"
        />
        <StatCard
          title="Credits Usage"
          value={`${(dashboardStats.credits.used ).toFixed(0)}`}
          subtitle={`${(dashboardStats.credits.bought ).toFixed(0)} total bought`}
          icon={CreditCard}
          color="orange"
        />
      </div>

      {/* Alert Cards */}
      <AlertCards
        lowCreditUsers={dashboardStats.lowCreditUsers}
        expiredPlans={dashboardStats.expiredPlans}
        newSignups={dashboardStats.newSignups}
      />

      {/* Popular Plans */}
      <PopularPlansCard popularPlans={dashboardStats.popularPlans} />
    </div>
  );
};

export default DashboardOverview;
