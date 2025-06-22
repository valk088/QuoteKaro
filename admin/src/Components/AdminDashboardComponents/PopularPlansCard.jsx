import React from 'react';
import { Crown, ArrowUpRight } from 'lucide-react';

const PopularPlansCard = ({ popularPlans }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
        <Crown className="text-yellow-400 mr-2" size={20} />
        Most Popular Plans
      </h3>
      <div className="space-y-3">
        {popularPlans.length > 0 ? (
          popularPlans.map((plan, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
              <span className="text-white font-medium">{plan.name}</span>
              <div className="flex items-center">
                <span className="text-gray-400 text-sm mr-2">{plan.users} users</span>
                <ArrowUpRight size={16} className="text-green-400" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 text-center py-4">No popular plans data available.</p>
        )}
      </div>
    </div>
  );
};

export default PopularPlansCard;
