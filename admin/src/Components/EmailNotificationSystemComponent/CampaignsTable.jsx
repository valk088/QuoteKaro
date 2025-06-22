import React from 'react';
import { Send, Filter, Edit, Trash2, Pause, Play } from 'lucide-react';

const CampaignsTable = ({ filteredCampaigns, filters, handleFilterChange, onEdit, onDelete, onSend, onToggleStatus }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Send className="mr-2" size={24} />
        Email Campaigns
      </h3>
      <div className="flex items-center space-x-3 mb-4">
        <label htmlFor="campaignStatusFilter" className="text-gray-300 text-sm">Filter by Status:</label>
        <select
          id="campaignStatusFilter"
          name="campaignStatus"
          value={filters.campaignStatus}
          onChange={handleFilterChange}
          className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="active">Active</option>
          <option value="paused">Paused</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Campaign Name</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Type</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Status</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Sent</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Opens</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Clicks</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Last Sent</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampaigns.length > 0 ? (
              filteredCampaigns.map((campaign) => (
                <tr key={campaign._id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-white">{campaign.name}</td>
                  <td className="px-4 py-3 text-gray-300">{campaign.type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      campaign.status === 'active' ? 'bg-green-500/20 text-green-300' :
                      campaign.status === 'paused' ? 'bg-yellow-500/20 text-yellow-300' :
                      campaign.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                      campaign.status === 'draft' ? 'bg-gray-500/20 text-gray-300' :
                      'bg-red-500/20 text-red-300' // cancelled
                    }`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-300">{campaign.sentCount}</td>
                  <td className="px-4 py-3 text-gray-300">{campaign.opensCount}</td>
                  <td className="px-4 py-3 text-gray-300">{campaign.clicksCount}</td>
                  <td className="px-4 py-3 text-gray-300">
                    {campaign.lastSentDate ? new Date(campaign.lastSentDate).toLocaleDateString() : 'N/A'}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEdit(campaign._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="Edit Campaign"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onSend(campaign._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-green-400 hover:text-green-300"
                        title="Send Campaign"
                        disabled={campaign.status === 'active' || campaign.status === 'completed'}
                      >
                        <Send size={16} />
                      </button>
                      <button
                        onClick={() => onToggleStatus(campaign)}
                        className={`p-2 hover:bg-gray-600 rounded-lg transition-colors ${
                          campaign.status === 'active' ? 'text-yellow-400 hover:text-yellow-300' : 'text-green-400 hover:text-green-300'
                        }`}
                        title={campaign.status === 'active' ? 'Pause Campaign' : 'Activate Campaign'}
                        disabled={campaign.status === 'completed' || campaign.status === 'draft' || campaign.status === 'cancelled'}
                      >
                        {campaign.status === 'active' ? <Pause size={16} /> : <Play size={16} />}
                      </button>
                      <button
                        onClick={() => onDelete(campaign._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete Campaign"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-400">No email campaigns found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CampaignsTable;
