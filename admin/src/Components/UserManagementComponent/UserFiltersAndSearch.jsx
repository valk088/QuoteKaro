import React from 'react';
import { Search, Filter } from 'lucide-react';

const UserFiltersAndSearch = ({
  searchTerm,
  setSearchTerm,
  filterStatus,
  setFilterStatus,
  filterPlan,
  setFilterPlan,
  showBulkActions,
  setShowBulkActions,
  selectedUsersLength, // Prop for selected users count
  handleBulkAction, // Placeholder for bulk action handler
}) => {
  // Dummy plans for filter dropdown (you might want to fetch these from backend too)
  const availablePlans = [
    'Basic Plan', 'Pro Plan', 'Enterprise', 'Starter' // Added 'Starter' based on your schema default
  ];

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, UID, or phone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-3">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="suspended">Suspended</option>
          </select>
          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">All Plans</option>
            {availablePlans.map(plan => (
              <option key={plan} value={plan}>{plan}</option>
            ))}
          </select>
          <button
            onClick={() => setShowBulkActions(!showBulkActions)}
            className="bg-gray-700 hover:bg-gray-600 border border-gray-600 rounded-lg px-4 py-3 text-gray-300 hover:text-white transition-colors"
            title="Toggle Bulk Actions"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Bulk Actions */}
      {showBulkActions && selectedUsersLength > 0 && (
        <div className="mt-4 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-blue-300">{selectedUsersLength} users selected</span>
            <div className="flex space-x-2 flex-wrap gap-2">
              <button
                onClick={() => handleBulkAction('send_email')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Send Email
              </button>
              <button
                onClick={() => handleBulkAction('add_credits')}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Add Credits
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Suspend
              </button>
              <button
                onClick={() => handleBulkAction('activate')}
                className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="bg-red-800 hover:bg-red-900 text-white px-3 py-1 rounded text-sm transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserFiltersAndSearch;
