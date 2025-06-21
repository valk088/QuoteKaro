import React from 'react';
import { TrendingUp, PieChart as PieChartIcon, BarChart as BarChartIcon } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar
} from 'recharts';

const PIE_COLORS = ['#facc15', '#3b82f6', '#8b5cf6', '#22c55e']; // yellow (draft), blue (sent), purple (viewed), green (accepted)

const EstimateCharts = ({ filteredEstimates, usersLookup }) => {
  // Data for Estimate Status Distribution Pie Chart
  const statusCounts = filteredEstimates.reduce((acc, estimate) => {
    // Map dummy 'paid' to schema 'accepted' for accurate charting
    const statusKey = estimate.status === 'paid' ? 'accepted' : estimate.status;
    acc[statusKey] = (acc[statusKey] || 0) + 1;
    return acc;
  }, {});

  const pieChartData = [
    { name: 'Draft', value: statusCounts.draft || 0, color: PIE_COLORS[0] },
    { name: 'Sent', value: statusCounts.sent || 0, color: PIE_COLORS[1] },
    { name: 'Viewed', value: statusCounts.viewed || 0, color: PIE_COLORS[2] }, // Added 'Viewed'
    { name: 'Accepted', value: statusCounts.accepted || 0, color: PIE_COLORS[3] }, // Changed 'Paid' to 'Accepted'
  ];

  // Filter out slices with zero value to avoid cluttering the chart, but only if they are not all zero
  const activePieChartData = pieChartData.filter(data => data.value > 0);


  // Data for Estimate Volume Trends (Monthly)
  const monthlyVolume = filteredEstimates.reduce((acc, estimate) => {
    // Use createdAt for trend analysis (when the estimate was created)
    const date = estimate.createdAt || estimate.date; // Fallback to 'date' if 'createdAt' is not available
    const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});
  const trendData = Object.keys(monthlyVolume).sort((a, b) => {
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
    estimates: monthlyVolume[month],
  }));

  // Data for Top 5 Users by Estimate Volume
  const userEstimateCounts = filteredEstimates.reduce((acc, estimate) => {
    const userId = estimate.userId?._id || estimate.userId; // Handle both populated and unpopulated userId
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});

  const topUsersData = Object.keys(userEstimateCounts)
    .map(userId => ({
      userId,
      estimates: userEstimateCounts[userId],
      // Use usersLookup to get the studioName, fallback to a sliced ID if not found
      name: usersLookup[userId]?.studioName || `User ${String(userId).slice(-4)}`
    }))
    .sort((a, b) => b.estimates - a.estimates)
    .slice(0, 5);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"> {/* Adjusted grid for top users chart */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <PieChartIcon className="mr-2" size={24} />
          Estimate Status Distribution
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
                minAngle={2} // Ensure small slices are visible
              >
                {
                  activePieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} /> 
                  ))
                }
              </Pie>
              <Tooltip formatter={(value, name) => [`${value} estimates`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-center py-10">No estimates for status distribution chart.</div>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2" size={24} />
          Estimate Volume Trends
        </h3>
        {trendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={trendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="estimates" stroke="#3b82f6" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-center py-10">No estimates for volume trend chart.</div>
        )}
      </div>

      {/* Top 5 Users by Estimate Volume Chart (moved here) */}
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 lg:col-span-1"> {/* Adjusted col-span */}
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <BarChartIcon className="mr-2" size={24} />
          Top 5 Users by Estimate Volume
        </h3>
        {topUsersData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={topUsersData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="name" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip />
              <Legend />
              <Bar dataKey="estimates" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-center py-10">No estimate data for top users chart.</div>
        )}
      </div>
    </div>
  );
};

export default EstimateCharts;
