import React from 'react';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';

const PaymentTable = ({ transactions, exportToCSV, currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="flex justify-between items-center p-6 pb-0">
        <h3 className="text-xl font-bold text-white">All Transactions</h3>
        <button
          onClick={exportToCSV}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
          title="Export Transactions to CSV"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </button>
      </div>

      <div className="overflow-x-auto mt-4">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">ID</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">User</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Date</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Type</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Amount</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Payment Mode</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <tr key={transaction._id} className={`border-t border-gray-700 hover:bg-gray-700/30 transition-colors`}>
                  <td className="px-6 py-4 text-white">{transaction._id}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {transaction.userId?.studioName || `User ${transaction.userId?._id?.slice(-4)}`}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{new Date(transaction.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {transaction.type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                  </td>
                  <td className="px-6 py-4 text-white">₹{transaction.amount.toLocaleString()}</td>
                  <td className="px-6 py-4 text-gray-300">{transaction.method}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      transaction.status === 'success' ? 'bg-green-500/20 text-green-300' :
                      transaction.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                      'bg-red-500/20 text-red-300'
                    }`}>
                      {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No transactions found matching your filters.
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
          <ChevronLeft size={16} />
        </button>
        <span className="text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default PaymentTable;
