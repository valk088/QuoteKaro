import React from 'react';
import { Tag, Edit, Trash2, Plus } from 'lucide-react';

const EmailTemplatesManager = ({ emailTemplates, onEditTemplate, onDeleteTemplate, onCreateTemplate }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <Tag className="mr-2" size={24} />
        Email Templates Manager
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-700">
            <tr>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Template Name</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Subject</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Last Updated</th>
              <th className="text-left px-4 py-3 text-gray-300 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {emailTemplates.length > 0 ? (
              emailTemplates.map((template) => (
                <tr key={template._id} className="border-t border-gray-700 hover:bg-gray-700/30 transition-colors">
                  <td className="px-4 py-3 text-white">{template.name}</td>
                  <td className="px-4 py-3 text-gray-300">{template.subject}</td>
                  <td className="px-4 py-3 text-gray-300">{new Date(template.updatedAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onEditTemplate(template._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-blue-400 hover:text-blue-300"
                        title="Edit Template"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => onDeleteTemplate(template._id)}
                        className="p-2 hover:bg-gray-600 rounded-lg transition-colors text-red-400 hover:text-red-300"
                        title="Delete Template"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-400">No email templates found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <button
        onClick={onCreateTemplate}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center text-sm"
      >
        <Plus size={14} className="mr-2" />
        Create New Template
      </button>
    </div>
  );
};

export default EmailTemplatesManager;
