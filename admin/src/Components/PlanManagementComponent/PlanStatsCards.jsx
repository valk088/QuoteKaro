import React from 'react';
import { Package, Eye, Star } from 'lucide-react';

const PlanStatsCards = ({ plans }) => {
  const totalPlans = plans.length;
  const activePlans = plans.filter(p => p.isActive).length;
  const popularPlans = plans.filter(p => p.isPopular).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Package className="text-blue-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{totalPlans}</p>
            <p className="text-gray-400 text-sm">Total Plans</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-green-500/20 rounded-lg">
            <Eye className="text-green-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{activePlans}</p>
            <p className="text-gray-400 text-sm">Active Plans</p>
          </div>
        </div>
      </div>
      <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
        <div className="flex items-center">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Star className="text-yellow-400" size={20} />
          </div>
          <div className="ml-3">
            <p className="text-2xl font-bold text-white">{popularPlans}</p>
            <p className="text-gray-400 text-sm">Popular Plans</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanStatsCards;
