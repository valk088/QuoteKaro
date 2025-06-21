import React from 'react';
import { Edit, Trash2, Star, Eye, EyeOff, Tag } from 'lucide-react';

const PlanTable = ({ plans, handleEditPlan, handleToggleStatus, handleTogglePopular, handleDeletePlan }) => {
  return (
    <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Plan Name</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Type</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Price</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Credits</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Features</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Status</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Popular</th>
              <th className="text-left px-6 py-4 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.length > 0 ? (
              plans.map((plan) => (
                <tr key={plan._id} className={`border-t border-gray-700 hover:bg-gray-700/30 transition-colors`}>
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{plan.name}</p>
                    <p className="text-gray-400 text-sm">{plan._id}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        plan.type === 'subscription' ? 'bg-purple-500/20 text-purple-300' :
                        'bg-indigo-500/20 text-indigo-300'
                    }`}>
                      {plan.type.charAt(0).toUpperCase() + plan.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">
                      {plan.type === 'subscription' ? (
                        <>
                          ${plan.monthlyPrice}<span className="text-gray-400 text-xs ml-1">/mo</span>
                          <br/>
                          ${plan.yearlyPrice}<span className="text-gray-400 text-xs ml-1">/yr</span>
                        </>
                      ) : (
                        `$${plan.monthlyPrice}`
                      )}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-white">{plan.credits} credits</p>
                    {plan.type === 'one-time' && plan.bonusCredits > 0 && (
                        <p className="text-gray-400 text-xs mt-1">+{plan.bonusCredits} bonus</p>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <ul className="list-disc list-inside text-gray-300 text-sm">
                      {plan.features.slice(0, 2).map((feature, idx) => (
                        <li key={idx}>{feature}</li>
                      ))}
                      {plan.features.length > 2 && (
                        <li className="text-gray-500">...and {plan.features.length - 2} more</li>
                      )}
                    </ul>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1  rounded-full text-xs font-medium ${
                      plan.isActive
                        ? 'bg-green-500/20 text-green-300'
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {plan.isPopular ? (
                      <Star size={18} className="text-yellow-400" title="Popular" />
                    ) : (
                      <Star size={18} className="text-gray-500" title="Not Popular" />
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleEditPlan(plan)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="Edit Plan"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleToggleStatus(plan)}
                        className={`p-2 hover:bg-gray-600 rounded-lg transition-colors ${
                          plan.isActive
                            ? 'text-red-400 hover:text-red-300'
                            : 'text-green-400 hover:text-green-300'
                        }`}
                        title={plan.isActive ? 'Deactivate Plan' : 'Activate Plan'}
                      >
                        {plan.isActive ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                      <button
                        onClick={() => handleTogglePopular(plan)}
                        className={`p-2 hover:bg-gray-600 rounded-lg transition-colors ${
                          plan.isPopular
                            ? 'text-yellow-400 hover:text-yellow-300'
                            : 'text-gray-400 hover:text-gray-300'
                        }`}
                        title={plan.isPopular ? 'Unmark as Popular' : 'Mark as Popular'}
                      >
                        <Tag size={16} />
                      </button>
                      <button
                        onClick={() => handleDeletePlan(plan._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete Plan"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-8 text-gray-400">
                  No plans found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlanTable;
