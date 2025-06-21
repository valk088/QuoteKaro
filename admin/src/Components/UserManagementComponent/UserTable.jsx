import React from 'react';
import { Edit, Ban, Play, Plus, Send,Trash2 , Phone, MapPin, Clock, AlertTriangle, Eye } from 'lucide-react';

const UserTable = ({
  users,
  selectedUsers,
  handleSelectAllUsers,
  handleSelectUser,
  handleViewUser,
  handleToggleSuspendActivate,
  handleAddCredits,
  handleSendEmail,
  handleDeleteUser,
  currentPage,
  totalPages,
  setCurrentPage,
}) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-6 py-4">
                <input
                  type="checkbox"
                  onChange={handleSelectAllUsers}
                  checked={selectedUsers.length === users.length && users.length > 0}
                  className="rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                />
              </th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">User</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Contact</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Plan & Credits</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Activity</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id} className={`border-t border-gray-700 hover:bg-gray-700/30 transition-colors`}>
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user._id)}
                      onChange={() => handleSelectUser(user._id)}
                      className="rounded text-blue-600 focus:ring-blue-500 bg-gray-700 border-gray-600"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                        <span className="text-white font-medium">{user.studioName.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="text-white font-medium">{user.studioName}</p>
                        <p className="text-gray-400 text-sm">{user._id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-white">{user.email}</p>
                      <p className="text-gray-400 flex items-center mt-1">
                        <Phone size={12} className="mr-1" />
                        {user.phone}
                      </p>
                      <p className="text-gray-400 flex items-center mt-1">
                        <MapPin size={12} className="mr-1" />
                        {user.address?.city}, {user.address?.state}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mb-1 ${
                        user.plan === 'Enterprise' ? 'bg-purple-500/20 text-purple-300' :
                        user.plan === 'Pro Plan' ? 'bg-blue-500/20 text-blue-300' :
                        user.plan === 'Basic Plan' ? 'bg-gray-500/20 text-gray-300' :
                        'bg-gray-500/20 text-gray-300' // Default for 'Starter' or other
                      }`}>
                        {user.plan}
                      </span>
                      <p className="text-white text-sm">{user.left_credits} credits</p>
                      {user.left_credits < 10 && (
                        <p className="text-red-400 text-xs flex items-center mt-1">
                          <AlertTriangle size={12} className="mr-1" />
                          Low credits
                        </p>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      !user.isSuspended // Based on schema, 'true' means suspended, so 'false' is active
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {!user.isSuspended ? '● Active' : '● Suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="text-gray-300">
                      <p>{user.total_estimates} estimates</p>
                      <p className="text-gray-400 flex items-center mt-1">
                        <Clock size={12} className="mr-1" />
                        {new Date(user.updatedAt || user.joinedAt).toLocaleDateString()} {/* Using updatedAt or joinedAt for last active */}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleViewUser(user._id)} // Pass user._id to view details
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="View/Edit User"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleAddCredits(user._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-green-400 hover:text-green-300"
                        title="Add Credits"
                      >
                        <Plus size={16} />
                      </button>
                      {/* <button
                        onClick={() => handleSendEmail(user.email)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="Send Email"
                      >
                        <Send size={16} />
                      </button> */}
                      <button
                        onClick={() => handleToggleSuspendActivate(user)}
                        className={`p-2 hover:bg-gray-600 rounded-lg transition-colors ${
                          !user.isSuspended
                            ? 'text-red-400 hover:text-red-300' // If active, show suspend option
                            : 'text-green-400 hover:text-green-300' // If suspended, show activate option
                        }`}
                        title={!user.isSuspended ? 'Suspend User' : 'Activate User'}
                      >
                        {!user.isSuspended ? <Ban size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user._id)} // Assume a delete handler
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-600 hover:text-red-500"
                        title="Delete User"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No users found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center px-6 py-4 bg-gray-700 border-t border-gray-600">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <svg className="h-4 w-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default UserTable;
