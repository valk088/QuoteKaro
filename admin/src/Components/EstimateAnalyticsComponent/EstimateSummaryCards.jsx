import React from 'react';
import { List, DollarSign, Tag, Star } from 'lucide-react';

const EstimateSummaryCards = ({ totalEstimates, totalValue, averageValue, acceptedEstimates }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <List className="text-blue-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{totalEstimates}</p>
            <p className="text-gray-400 text-sm">Total Estimates</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <DollarSign className="text-green-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">${totalValue.toLocaleString()}</p>
            <p className="text-gray-400 text-sm">Total Value</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Tag className="text-purple-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">${averageValue}</p>
            <p className="text-gray-400 text-sm">Avg. Estimate Value</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Star className="text-yellow-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{acceptedEstimates}</p>
            <p className="text-gray-400 text-sm">Accepted Estimates</p> {/* Changed 'Paid' to 'Accepted' */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimateSummaryCards;
