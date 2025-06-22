import React from 'react';
import { Send, Eye, MousePointerClick, CheckCircle } from 'lucide-react';

const EmailStatsCards = ({ totalEmailsSent, overallOpenRate, overallCTR, successfulDeliveries }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Send className="text-blue-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{totalEmailsSent.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Total Emails Sent</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Eye className="text-green-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{overallOpenRate}%</p>
            <p className="text-gray-400 text-sm">Overall Open Rate</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <MousePointerClick className="text-purple-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{overallCTR}%</p>
            <p className="text-gray-400 text-sm">Overall CTR</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <CheckCircle className="text-yellow-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{successfulDeliveries.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Successful Deliveries</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailStatsCards;
