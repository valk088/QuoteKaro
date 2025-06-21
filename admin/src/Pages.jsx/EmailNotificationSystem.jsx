import React, { useState, useMemo } from 'react';
import {
  Mail, Bell, Send, Filter,PieChart ,Edit ,Trash2 , Plus, Target, Tag, BarChart, TrendingUp, CheckCircle, Clock, Eye, MousePointerClick
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart as RechartsPieChart, Pie, Cell, Legend
} from 'recharts';

const EmailNotificationSystem = () => {
  // Dummy data for campaigns, notifications, and stats
  const [campaigns] = useState([
    { id: 'CAMP001', name: 'Welcome Series', type: 'cold_email', status: 'active', sent: 1200, opens: 850, clicks: 150, lastSent: '2024-06-20' },
    { id: 'CAMP002', name: 'Summer Promo', type: 'cold_email', status: 'paused', sent: 2500, opens: 1100, clicks: 200, lastSent: '2024-06-10' },
    { id: 'CAMP003', name: 'New Feature Announce', type: 'cold_email', status: 'completed', sent: 1800, opens: 900, clicks: 180, lastSent: '2024-05-15' },
  ]);

  const [notifications] = useState([
    { id: 'NOTF001', message: 'System maintenance scheduled for tonight.', type: 'broadcast', target: 'all_users', sent: '2024-06-21 10:00 AM' },
    { id: 'NOTF002', message: 'Your Pro Plan is expiring soon!', type: 'trigger', target: 'users_pro_plan_expiring', sent: '2024-06-19 03:00 PM' },
    { id: 'NOTF003', message: 'New update available for the app.', type: 'broadcast', target: 'active_users', sent: '2024-06-18 09:00 AM' },
  ]);

  const [emailTemplates] = useState([
    { id: 'TMPL001', name: 'Welcome Email', subject: 'Welcome to Our Service!', lastUpdated: '2024-04-01' },
    { id: 'TMPL002', name: 'Low Credits Alert', subject: 'Action Required: Your credits are low', lastUpdated: '2024-03-10' },
    { id: 'TMPL003', name: 'Subscription Renewal', subject: 'Your Subscription is Renewing Soon', lastUpdated: '2024-05-20' },
  ]);

  const [filters, setFilters] = useState({
    campaignStatus: 'all',
    notificationType: 'all',
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // Memoized filtered campaigns
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesStatus = filters.campaignStatus === 'all' || campaign.status === filters.campaignStatus;
      return matchesStatus;
    });
  }, [campaigns, filters.campaignStatus]);

  // Memoized filtered notifications
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesType = filters.notificationType === 'all' || notification.type === filters.notificationType;
      return matchesType;
    });
  }, [notifications, filters.notificationType]);

  // Global email stats calculation
  const totalEmailsSent = campaigns.reduce((sum, campaign) => sum + campaign.sent, 0);
  const totalOpens = campaigns.reduce((sum, campaign) => sum + campaign.opens, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicks, 0);

  const overallOpenRate = totalEmailsSent > 0 ? ((totalOpens / totalEmailsSent) * 100).toFixed(2) : 0;
  const overallCTR = totalOpens > 0 ? ((totalClicks / totalOpens) * 100).toFixed(2) : 0;

  // Data for Email Volume Trends (Monthly)
  const monthlySent = campaigns.reduce((acc, campaign) => {
    const month = new Date(campaign.lastSent).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + campaign.sent;
    return acc;
  }, {});
  const emailTrendData = Object.keys(monthlySent).sort().map(month => ({
    month,
    sent: monthlySent[month],
  }));

  // Data for Campaign Status Distribution (Pie Chart)
  const campaignStatusCounts = campaigns.reduce((acc, campaign) => {
    acc[campaign.status] = (acc[campaign.status] || 0) + 1;
    return acc;
  }, {});
  const pieChartData = [
    { name: 'Active', value: campaignStatusCounts.active || 0, color: '#22c55e' },
    { name: 'Paused', value: campaignStatusCounts.paused || 0, color: '#facc15' },
    { name: 'Completed', value: campaignStatusCounts.completed || 0, color: '#3b82f6' },
  ];
  const PIE_COLORS = ['#22c55e', '#facc15', '#3b82f6']; // green, yellow, blue

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Mail className="mr-3" size={32} />
              Email & Notification System
            </h1>
            <p className="text-gray-400 mt-1">Marketing & transactional messaging control.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center">
              <Plus size={16} className="mr-2" />
              Create New Campaign
            </button>
          </div>
        </div>

        {/* Global Email Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Send className="text-blue-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{totalEmailsSent.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Total Emails Sent</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <Eye className="text-green-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{overallOpenRate}%</p>
                <p className="text-gray-400 text-sm">Overall Open Rate</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <MousePointerClick className="text-purple-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{overallCTR}%</p>
                <p className="text-gray-400 text-sm">Overall CTR</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-500/20 rounded-lg">
                <CheckCircle className="text-yellow-400" size={20} />
              </div>
              <div className="ml-3">
                <p className="text-2xl font-bold text-white">{(totalEmailsSent - campaigns.filter(c => c.status === 'failed').length).toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Successful Deliveries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Email Stats Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <TrendingUp className="mr-2" size={24} />
              Email Volume Trends
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={emailTrendData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                <XAxis dataKey="month" stroke="#cbd5e0" />
                <YAxis stroke="#cbd5e0" />
                <Tooltip formatter={(value) => [`${value} emails`, 'Sent']} />
                <Legend />
                <Line type="monotone" dataKey="sent" stroke="#3b82f6" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center">
              <PieChart className="mr-2" size={24} />
              Campaign Status Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {
                    pieChartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip formatter={(value, name) => [`${value} campaigns`, name]} />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Cold Email Campaigns */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Send className="mr-2" size={24} />
            Cold Email Campaigns
          </h3>
          <div className="flex items-center space-x-3 mb-4">
            <label htmlFor="campaignStatusFilter" className="text-gray-300 text-sm">Filter by Status:</label>
            <select
              id="campaignStatusFilter"
              name="campaignStatus"
              value={filters.campaignStatus}
              onChange={handleFilterChange}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Campaign Name</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Status</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Sent</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Opens</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Clicks</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Last Sent</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.length > 0 ? (
                  filteredCampaigns.map((campaign) => (
                    <tr key={campaign.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white">{campaign.name}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          campaign.status === 'active' ? 'bg-green-500/20 text-green-300' :
                          campaign.status === 'paused' ? 'bg-yellow-500/20 text-yellow-300' :
                          'bg-blue-500/20 text-blue-300'
                        }`}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-gray-300">{campaign.sent}</td>
                      <td className="px-4 py-3 text-gray-300">{campaign.opens}</td>
                      <td className="px-4 py-3 text-gray-300">{campaign.clicks}</td>
                      <td className="px-4 py-3 text-gray-300">{new Date(campaign.lastSent).toLocaleDateString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">No cold email campaigns found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Broadcast Notifications */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Bell className="mr-2" size={24} />
            Broadcast Notifications
          </h3>
          <div className="flex items-center space-x-3 mb-4">
            <label htmlFor="notificationTypeFilter" className="text-gray-300 text-sm">Filter by Type:</label>
            <select
              id="notificationTypeFilter"
              name="notificationType"
              value={filters.notificationType}
              onChange={handleFilterChange}
              className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="broadcast">Broadcast</option>
              <option value="trigger">Trigger-based</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Message</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Type</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Target</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Sent At</th>
                </tr>
              </thead>
              <tbody>
                {filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notification) => (
                    <tr key={notification.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white">{notification.message}</td>
                      <td className="px-4 py-3 text-gray-300">
                        {notification.type === 'broadcast' ? 'Broadcast' : 'Trigger-based'}
                      </td>
                      <td className="px-4 py-3 text-gray-300">{notification.target.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())}</td>
                      <td className="px-4 py-3 text-gray-300">{notification.sent}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-400">No notifications found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Trigger-based Automation (Simplified representation) */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Target className="mr-2" size={24} />
            Trigger-based Automation
          </h3>
          <p className="text-gray-400 mb-4">Automate emails or notifications based on specific user actions or data thresholds.</p>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <p><strong>Low Credits Alert:</strong> Automatically send email/notification when user credits &lt; 10.</p>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <p><strong>Plan Expiry Reminder:</strong> Send reminder 7 days before subscription plan expires.</p>
            </li>
            <li className="flex items-start">
              <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
              <p><strong>New User Welcome:</strong> Send a welcome email immediately after user signup.</p>
            </li>
          </ul>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm">
            <Plus size={14} className="mr-2" />
            Add New Trigger
          </button>
        </div>

        {/* Email Templates Manager */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4 flex items-center">
            <Tag className="mr-2" size={24} />
            Email Templates Manager
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Template Name</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Subject</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Last Updated</th>
                  <th className="text-left px-4 py-3 text-gray-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {emailTemplates.length > 0 ? (
                  emailTemplates.map((template) => (
                    <tr key={template.id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                      <td className="px-4 py-3 text-white">{template.name}</td>
                      <td className="px-4 py-3 text-gray-300">{template.subject}</td>
                      <td className="px-4 py-3 text-gray-300">{new Date(template.lastUpdated).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300" title="Edit Template">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300" title="Delete Template">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-gray-400">No email templates found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm">
            <Plus size={14} className="mr-2" />
            Create New Template
          </button>
        </div>

      </div>
    </div>
  );
};

export default EmailNotificationSystem;
