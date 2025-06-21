import React from 'react';
import { Clock, Send, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const EstimateTable = ({ estimates, usersLookup, currentPage, totalPages, setCurrentPage }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <h3 className="text-xl font-bold text-white p-6 pb-0">Filtered Estimates Detail</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">ID</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Client Name</th> {/* Changed from User ID */}
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Date</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Location</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Function Name</th> {/* Changed from Service */}
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Net Total</th> {/* Changed from Value */}
            </tr>
          </thead>
          <tbody>
            {estimates.length > 0 ? (
              estimates.map((estimate) => (
                <tr key={estimate._id} className={`border-t border-gray-700 hover:bg-gray-700/30 transition-colors`}>
                  <td className="px-6 py-4 text-white">{estimate._id}</td>
                  <td className="px-6 py-4 text-gray-300">
                    {estimate.clientName}
                    <p className="text-gray-500 text-xs">
                      {usersLookup[estimate.userId?._id]?.studioName || `User ${estimate.userId?._id?.slice(-4)}`}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-gray-300">{new Date(estimate.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-gray-300">{estimate.location}</td>
                  <td className="px-6 py-4 text-gray-300">{estimate.functionName}</td> {/* Use functionName */}
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      estimate.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300' :
                      estimate.status === 'sent' ? 'bg-blue-500/20 text-blue-300' :
                      estimate.status === 'viewed' ? 'bg-purple-500/20 text-purple-300' : // Added viewed status
                      'bg-green-500/20 text-green-300' // 'accepted' status
                    }`}>
                      {estimate.status === 'draft' && <Clock size={12} className="mr-1" />}
                      {estimate.status === 'sent' && <Send size={12} className="mr-1" />}
                      {estimate.status === 'viewed' && <Eye size={12} className="mr-1" />} {/* Assuming Eye icon for viewed */}
                      {estimate.status === 'accepted' && <CheckCircle size={12} className="mr-1" />}
                      {estimate.status.charAt(0).toUpperCase() + estimate.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-white">₹{estimate.netTotal.toLocaleString()}</td> {/* Use netTotal */}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-8 text-gray-400">
                  No estimates found matching your filters.
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

export default EstimateTable;
