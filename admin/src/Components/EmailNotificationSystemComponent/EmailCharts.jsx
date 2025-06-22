import React from 'react';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#22c55e', '#facc15', '#3b82f6', '#ef4444']; // green (active), yellow (paused), blue (completed), red (cancelled)

const EmailCharts = ({ campaigns }) => {
  // Data for Email Volume Trends (Monthly)
  const monthlySent = campaigns.reduce((acc, campaign) => {
    // Only count sent emails for active or completed campaigns
    if (campaign.status === 'active' || campaign.status === 'completed') {
      const date = campaign.lastSentDate || campaign.createdAt; // Use lastSentDate or createdAt
      if (date) {
        const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
        acc[month] = (acc[month] || 0) + campaign.sentCount;
      }
    }
    return acc;
  }, {});

  const emailTrendData = Object.keys(monthlySent).sort((a, b) => {
    // Custom sort for month-year strings (e.g., 'Jan 2024' vs 'Feb 2024')
    const [monthA, yearA] = a.split(' ');
    const [monthB, yearB] = b.split(' ');

    if (yearA !== yearB) {
      return parseInt(yearA) - parseInt(yearB);
    }
    const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB);
  }).map(month => ({
    month,
    sent: monthlySent[month],
  }));

  // Data for Campaign Status Distribution (Pie Chart)
  const campaignStatusCounts = campaigns.reduce((acc, campaign) => {
    acc[campaign.status] = (acc[campaign.status] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = [
    { name: 'Active', value: campaignStatusCounts.active || 0, color: PIE_COLORS[0] },
    { name: 'Paused', value: campaignStatusCounts.paused || 0, color: PIE_COLORS[1] },
    { name: 'Completed', value: campaignStatusCounts.completed || 0, color: PIE_COLORS[2] },
    { name: 'Draft', value: campaignStatusCounts.draft || 0, color: '#a855f7' }, // Adding draft
    { name: 'Cancelled', value: campaignStatusCounts.cancelled || 0, color: PIE_COLORS[3] }, // Adding cancelled
  ];

  const activePieChartData = pieChartData.filter(data => data.value > 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2" size={24} />
          Email Volume Trends
        </h3>
        {emailTrendData.length > 0 ? (
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
        ) : (
          <div className="text-gray-400 text-center py-10">No email volume data for chart.</div>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <PieChartIcon className="mr-2" size={24} />
          Campaign Status Distribution
        </h3>
        {activePieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activePieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                minAngle={2} // Ensures small slices are visible
              >
                {
                  activePieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))
                }
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} campaigns`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-center py-10">No campaign status data for chart.</div>
        )}
      </div>
    </div>
  );
};

export default EmailCharts;
