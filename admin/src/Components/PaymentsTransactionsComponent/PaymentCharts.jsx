import React from 'react';
import { TrendingUp, PieChart as PieChartIcon } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const PIE_COLORS = ['#3b82f6', '#22c55e', '#facc15', '#ef4444', '#a855f7', '#ec4899']; // blue, green, yellow, red, purple, pink

const PaymentCharts = ({ filteredTransactions }) => {
  console.log("PaymentCharts - filteredTransactions received:", filteredTransactions);

  // Data for Revenue Analytics (Monthly Trends)
  const monthlyRevenue = filteredTransactions
    .filter(t => t.status === 'success') // Ensure status matches backend 'success'
    .reduce((acc, transaction) => {
      const date = transaction.createdAt || transaction.date;
      const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });
      acc[month] = (acc[month] || 0) + transaction.amount;
      return acc;
    }, {});
  const revenueTrendData = Object.keys(monthlyRevenue).sort().map(month => ({
    month,
    revenue: parseFloat(monthlyRevenue[month].toFixed(2)),
  }));

  console.log("PaymentCharts - Monthly Revenue Data:", monthlyRevenue);
  console.log("PaymentCharts - Revenue Trend Data (for LineChart):", revenueTrendData);


  // Data for Revenue Breakdown by Payment Method (Pie Chart)
  const paymentModeRevenue = filteredTransactions
    .filter(t => t.status === 'success') // Ensure status matches backend 'success'
    .reduce((acc, transaction) => {
      acc[transaction.method] = (acc[transaction.method] || 0) + transaction.amount;
      return acc;
    }, {});

  const pieChartData = Object.keys(paymentModeRevenue).map(mode => ({
    name: mode,
    value: parseFloat(paymentModeRevenue[mode].toFixed(2)),
  }));

  console.log("PaymentCharts - Payment Mode Revenue Data (before chart format):", paymentModeRevenue);
  console.log("PaymentCharts - Pie Chart Data (for PieChart):", pieChartData);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <TrendingUp className="mr-2" size={24} />
          Revenue Analytics
        </h3>
        {revenueTrendData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={revenueTrendData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
              <XAxis dataKey="month" stroke="#cbd5e0" />
              <YAxis stroke="#cbd5e0" />
              <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-center py-10">No completed transactions for chart data.</div>
        )}
      </div>

      <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4 flex items-center">
          <PieChartIcon className="mr-2" size={24} />
          Revenue Breakdown by Payment Method
        </h3>
        {pieChartData.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                // Modified label to show name and percentage, ensuring better visibility for small slices
                label={({ name, percent, value }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                minAngle={2} // Added minAngle to ensure very small slices are visible
              >
                {
                  pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))
                }
              </Pie>
              <Tooltip formatter={(value, name) => [`$${value}`, name]} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="text-gray-400 text-center py-10">No completed transactions for chart data.</div>
        )}
      </div>
    </div>
  );
};

export default PaymentCharts;
