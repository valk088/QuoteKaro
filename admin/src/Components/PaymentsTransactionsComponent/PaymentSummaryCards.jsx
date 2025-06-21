import React from 'react';
import { Users, DollarSign, List, CheckCircle, Clock } from 'lucide-react';

const PaymentSummaryCards = ({ totalRevenue, totalTransactionsCount, completedTransactions, pendingTransactions }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <DollarSign className="text-green-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">₹{totalRevenue.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Total Revenue</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <List className="text-blue-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{totalTransactionsCount}</p>
            <p className="text-gray-400 text-sm">Total Transactions</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <CheckCircle className="text-purple-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{completedTransactions}</p>
            <p className="text-gray-400 text-sm">Completed Transactions</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Clock className="text-yellow-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{pendingTransactions}</p>
            <p className="text-gray-400 text-sm">Pending Transactions</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummaryCards;
