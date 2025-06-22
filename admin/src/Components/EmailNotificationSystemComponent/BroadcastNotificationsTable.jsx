import React from 'react';
import { Bell, Filter, Trash2, Eye } from 'lucide-react';

const BroadcastNotificationsTable = ({ filteredNotifications, filters, handleFilterChange, onDeleteNotification }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Bell className="mr-2" size={24} />
        Broadcast Notifications (Admin)
      </h3>
      <div className="flex items-center space-x-3 mb-4">
        <label htmlFor="notificationTypeFilter" className="text-gray-300 text-sm">Filter by Category:</label>
        <select
          id="notificationTypeFilter"
          name="notificationCategory" // Changed name to match filter state
          value={filters.notificationCategory} // Changed value to match filter state
          onChange={handleFilterChange}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="general">General</option>
          <option value="billing">Billing</option>
          <option value="updates">Updates</option>
          <option value="system">System</option>
          <option value="security">Security</option>
          <option value="reports">Reports</option>
          <option value="account">Account</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Title</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Message</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Category</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Sent At</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((notification) => (
                <tr key={notification._id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-white">{notification.title}</td>
                  <td className="px-4 py-3 text-gray-300 max-w-xs truncate">{notification.message}</td>
                  <td className="px-4 py-3 text-gray-300">{notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}</td>
                  <td className="px-4 py-3 text-gray-300">{new Date(notification.createdAt).toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      {/* You might want a 'view details' button for longer messages */}
                      <button
                        onClick={() => alert(`Notification Details:\nTitle: ${notification.title}\nMessage: ${notification.message}\nCategory: ${notification.category}\nSent: ${new Date(notification.createdAt).toLocaleString()}`)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteNotification(notification._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete Notification"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4 text-gray-400">No broadcast notifications found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BroadcastNotificationsTable;
