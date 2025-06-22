import React from 'react';
import { Target, CheckCircle, Plus } from 'lucide-react';

const TriggerAutomationSection = ({ onAddTrigger }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Target className="mr-2" size={24} />
        Trigger-based Automation
      </h3>
      <p className="text-gray-400 mb-4">Automate emails or notifications based on specific user actions or data thresholds.</p>
      <ul className="space-y-3 text-gray-300">
        <li className="flex items-start">
          <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
          <p><strong>Low Credits Alert:</strong> Automatically send email/notification when user credits &lt; 10.</p>
        </li>
        <li className="flex items-start">
          <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
          <p><strong>Plan Expiry Reminder:</strong> Send reminder 7 days before subscription plan expires.</p>
        </li>
        <li className="flex items-start">
          <CheckCircle size={18} className="text-green-500 mr-2 mt-1 flex-shrink-0" />
          <p><strong>New User Welcome:</strong> Send a welcome email immediately after user signup.</p>
        </li>
      </ul>
      <button
        onClick={onAddTrigger}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
      >
        <Plus size={14} className="mr-2" />
        Add New Trigger
      </button>
    </div>
  );
};

export default TriggerAutomationSection;
