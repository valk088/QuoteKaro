import React, { useState } from 'react';
import { 
  LayoutDashboard, Users, CreditCard, BarChart3, DollarSign, 
  Mail, Database, Settings, Headphones, Bot, Menu, X,
  TrendingUp, TrendingDown, Eye, UserCheck, AlertTriangle,
  Crown, Calendar, ArrowUpRight
} from 'lucide-react';
import UserManagement from './UserManagement';
import PlanCreditManagement from './PlanCreditManagement';
import EstimateAnalytics from './EstimateAnalytics';
import PaymentsTransactions from './PaymentsTransactions';
import EmailNotificationSystem from './EmailNotificationSystem';
import HelpdeskSupport from './HelpdeskSupport';
import AIAutomationSystem from './AIAutomationSystem';

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Dummy data for dashboard
  const dashboardStats = {
    totalUsers: { active: 1247, suspended: 23, total: 1270 },
    revenue: { last30d: 45630, allTime: 234567 },
    estimates: { thisMonth: 892, trend: 12.5 },
    credits: { used: 145670, bought: 178430 },
    lowCreditUsers: 45,
    expiredPlans: 12,
    newSignups: { last7d: 34, trend: -5.2 },
    popularPlans: [
      { name: 'Pro Plan', users: 567 },
      { name: 'Basic Plan', users: 423 },
      { name: 'Enterprise', users: 156 }
    ]
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'plans', label: 'Plans & Credits', icon: CreditCard },
    { id: 'analytics', label: 'Estimate Analytics', icon: BarChart3 },
    { id: 'payments', label: 'Payments ', icon: DollarSign },
    { id: 'notifications', label: 'Email & Notifications', icon: Mail },
    { id: 'export', label: 'Data Export & Backup', icon: Database },
    { id: 'settings', label: 'Admin Settings', icon: Settings },
    { id: 'support', label: 'Helpdesk / Support', icon: Headphones },
    { id: 'ai', label: 'AI & Automation', icon: Bot }
  ];

  const StatCard = ({ title, value, subtitle, trend, icon: Icon, color = 'blue' }) => {
    const colorClasses = {
      blue: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      green: 'bg-green-500/10 text-green-400 border-green-500/20',
      purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
      orange: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
      red: 'bg-red-500/10 text-red-400 border-red-500/20',
      yellow: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
    };

    return (
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-colors">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm font-medium">{title}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            {subtitle && <p className="text-gray-500 text-xs mt-1">{subtitle}</p>}
          </div>
          <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
            <Icon size={24} />
          </div>
        </div>
        {trend && (
          <div className="flex items-center mt-4">
            {trend > 0 ? (
              <TrendingUp size={16} className="text-green-400 mr-1" />
            ) : (
              <TrendingDown size={16} className="text-red-400 mr-1" />
            )}
            <span className={`text-sm font-medium ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
              {Math.abs(trend)}%
            </span>
            <span className="text-gray-400 text-sm ml-1">vs last month</span>
          </div>
        )}
      </div>
    );
  };

  const DashboardContent = () => (
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
          value={`$${(dashboardStats.revenue.last30d / 1000).toFixed(1)}k`}
          subtitle={`$${(dashboardStats.revenue.allTime / 1000).toFixed(0)}k all time`}
          trend={18.2}
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
          value={`${(dashboardStats.credits.used / 1000).toFixed(0)}k`}
          subtitle={`${(dashboardStats.credits.bought / 1000).toFixed(0)}k total bought`}
          icon={CreditCard}
          color="orange"
        />
      </div>

      {/* Alert Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
          <div className="flex items-center">
            <AlertTriangle className="text-red-400 mr-2" size={20} />
            <span className="text-red-400 font-medium">Low Credit Users</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{dashboardStats.lowCreditUsers}</p>
          <p className="text-red-300 text-sm">Users with 10 credits</p>
        </div>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4">
          <div className="flex items-center">
            <Calendar className="text-yellow-400 mr-2" size={20} />
            <span className="text-yellow-400 font-medium">Expired Plans</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{dashboardStats.expiredPlans}</p>
          <p className="text-yellow-300 text-sm">Need renewal reminder</p>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
          <div className="flex items-center">
            <UserCheck className="text-blue-400 mr-2" size={20} />
            <span className="text-blue-400 font-medium">New Signups (7d)</span>
          </div>
          <p className="text-2xl font-bold text-white mt-2">{dashboardStats.newSignups.last7d}</p>
          <div className="flex items-center mt-1">
            <TrendingDown size={14} className="text-red-400 mr-1" />
            <span className="text-red-400 text-sm">{Math.abs(dashboardStats.newSignups.trend)}% vs last week</span>
          </div>
        </div>
      </div>

      {/* Popular Plans */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Crown className="text-yellow-400 mr-2" size={20} />
          Most Popular Plans
        </h3>
        <div className="space-y-3">
          {dashboardStats.popularPlans.map((plan, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <span className="text-white font-medium">{plan.name}</span>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">{plan.users} users</span>
                <ArrowUpRight size={16} className="text-green-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardContent />;
      case 'users':
        return <UserManagement />;
      case 'plans':
        return <PlanCreditManagement />;
      case 'analytics':
        return <EstimateAnalytics />;
      case 'payments':
        return <PaymentsTransactions />;
      case 'notifications':
        return <EmailNotificationSystem />;
      case 'support':
        return <HelpdeskSupport />;
      case 'ai':
        return <AIAutomationSystem />;

      default:
        return (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                {sidebarItems.find(item => item.id === activeSection)?.label}
              </h2>
              <p className="text-gray-400">This section is coming next! Let me know when you're ready for it.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300 bg-gray-800 border-r border-gray-700 flex flex-col`}>
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            {sidebarOpen && <h2 className="text-xl font-bold text-white">Admin Panel</h2>}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon size={20} className="flex-shrink-0" />
                  {sidebarOpen && <span className="ml-3 font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* User Info */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">A</span>
            </div>
            {sidebarOpen && (
              <div className="ml-3">
                <p className="text-white text-sm font-medium">Admin User</p>
                <p className="text-gray-400 text-xs">Super Admin</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;