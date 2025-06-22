import React from 'react';
import { Filter, Settings, Bell } from 'lucide-react';

const ClientNotificationSidebar = ({ categories, filter, setFilter }) => {
  return (
    <div className="hidden lg:block lg:col-span-1">
      <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
        <div className="flex items-center gap-2 mb-6">
          <Filter size={20} className="text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
        </div>

        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setFilter(category.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                filter === category.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="capitalize">{category.label}</span>
              <span className={`text-xs px-2 py-1 rounded-full ${
                filter === category.id
                  ? 'bg-white/20 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {category.count}
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300">
            <Settings size={20} />
            Notification Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClientNotificationSidebar;
