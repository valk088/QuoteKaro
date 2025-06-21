import React from 'react';
import { Users, UserCheck, Ban, AlertTriangle } from 'lucide-react';

const UserStatsCards = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => !u.isSuspended).length; // Check against isSuspended
  const suspendedUsers = users.filter(u => u.isSuspended).length;
  const lowCreditUsers = users.filter(u => u.left_credits < 10).length; // Check left_credits

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Users className="text-blue-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{totalUsers}</p>
            <p className="text-gray-400 text-sm">Total Users</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <UserCheck className="text-green-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{activeUsers}</p>
            <p className="text-gray-400 text-sm">Active Users</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-red-500/20 rounded-lg">
            <Ban className="text-red-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{suspendedUsers}</p>
            <p className="text-gray-400 text-sm">Suspended</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <AlertTriangle className="text-yellow-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{lowCreditUsers}</p>
            <p className="text-gray-400 text-sm">Low Credits</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatsCards;
