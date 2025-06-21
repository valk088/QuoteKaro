import React from 'react';
import { Search } from 'lucide-react';

const PaymentFilters = ({ filters, handleFilterChange, uniqueUsers, uniquePaymentModes }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div>
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-300 mb-1">From Date</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-300 mb-1">To Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="user" className="block text-sm font-medium text-gray-300 mb-1">User</label>
          <select
            id="user"
            name="user"
            value={filters.user}
            onChange={handleFilterChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Users</option>
            {uniqueUsers.map(user => (
              // Display user's studioName if available, otherwise just the ID
              <option key={user._id} value={user._id}>{user.studioName || `User ${user._id.slice(-4)}`}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="paymentMode" className="block text-sm font-medium text-gray-300 mb-1">Payment Method</label>
          <select
            id="paymentMode"
            name="paymentMode"
            value={filters.paymentMode} 
            onChange={handleFilterChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Methods</option>
            {uniquePaymentModes.map(mode => (
              <option key={mode} value={mode}>{mode}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-300 mb-1">Status</label>
          <select
            id="status"
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="success">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default PaymentFilters;
