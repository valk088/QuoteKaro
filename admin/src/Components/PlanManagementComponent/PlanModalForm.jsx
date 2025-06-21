import React, { useState } from 'react';
import { Package, Plus, X } from 'lucide-react';

const PlanModalForm = ({ plan, onClose, onSave }) => {
  // Initialize formData based on existing plan or default for new plan
  const [formData, setFormData] = useState(plan ? { ...plan } : {
    name: '',
    type: 'subscription', // Default to subscription
    description: '',
    monthlyPrice: 0,
    yearlyPrice: 0, // Ensure this is always present, even if 0 for one-time
    credits: 0,
    bonusCredits: 0,
    features: [],
    isPopular: false,
    isActive: true,
  });
  const [newFeature, setNewFeature] = useState('');

  // Handles changes to form inputs
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue = type === 'checkbox' ? checked : value;

    setFormData(prev => {
      let updatedData = { ...prev, [name]: newValue };

      // Special handling when plan type changes
      if (name === 'type') {
        if (newValue === 'one-time') {
          // When changing to 'one-time', yearlyPrice is not applicable, set to 0
          updatedData.yearlyPrice = 0;
          // Ensure bonusCredits are considered relevant for one-time
          // (They are already initialized to 0, no change needed unless you want a different default)
        } else { // 'subscription'
          // When changing to 'subscription', bonusCredits are not applicable, set to 0
          updatedData.bonusCredits = 0;
        }
      }
      return updatedData;
    });
  };

  // Handles changes to individual feature inputs
  const handleFeatureChange = (e, index) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = e.target.value;
    setFormData(prev => ({ ...prev, features: updatedFeatures }));
  };

  // Adds a new feature to the features array
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  // Removes a feature from the features array by index
  const handleRemoveFeature = (index) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Handles form submission, calls onSave prop with current formData
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Pass the current form data to the parent component for saving
    onClose(); // Close the modal after saving
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Package className="mr-2" size={24} />
            {plan ? 'Edit Plan' : 'Add New Plan'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Plan Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-300 mb-1">Plan Type</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="subscription">Subscription</option>
              <option value="one-time">One-time</option>
            </select>
          </div>
          {formData.type === 'subscription' && (
            <>
              <div>
                <label htmlFor="monthlyPrice" className="block text-sm font-medium text-gray-300 mb-1">Monthly Price ($)</label>
                <input
                  type="number"
                  id="monthlyPrice"
                  name="monthlyPrice"
                  value={formData.monthlyPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  step="0.01"
                  required
                />
              </div>
              <div>
                <label htmlFor="yearlyPrice" className="block text-sm font-medium text-gray-300 mb-1">Yearly Price ($)</label>
                <input
                  type="number"
                  id="yearlyPrice"
                  name="yearlyPrice"
                  value={formData.yearlyPrice}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  step="0.01"
                  required
                />
              </div>
            </>
          )}
          {formData.type === 'one-time' && (
            <div>
              <label htmlFor="monthlyPrice" className="block text-sm font-medium text-gray-300 mb-1">Price ($)</label>
              <input
                type="number"
                id="monthlyPrice"
                name="monthlyPrice" // Using monthlyPrice as the single price for one-time plans
                value={formData.monthlyPrice}
                onChange={handleChange}
                className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                step="0.01"
                required
              />
            </div>
          )}
          <div>
            <label htmlFor="credits" className="block text-sm font-medium text-gray-300 mb-1">Credits Included</label>
            <input
              type="number"
              id="credits"
              name="credits"
              value={formData.credits}
              onChange={handleChange}
              className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          {formData.type === 'one-time' && (
              <div>
                  <label htmlFor="bonusCredits" className="block text-sm font-medium text-gray-300 mb-1">Bonus Credits (for one-time)</label>
                  <input
                      type="number"
                      id="bonusCredits"
                      name="bonusCredits"
                      value={formData.bonusCredits}
                      onChange={handleChange}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
              </div>
          )}
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">Features</label>
            <div className="space-y-2 mb-2">
              {formData.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(e, index)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                  <button type="button" onClick={() => handleRemoveFeature(index)} className="p-2 text-red-400 hover:text-red-300 rounded-lg">
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={newFeature}
                onChange={(e) => setNewFeature(e.target.value)}
                placeholder="Add new feature"
                className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
          <div className="col-span-2 flex items-center space-x-4">
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="isPopular"
                checked={formData.isPopular}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 mr-2 bg-gray-700 border-gray-600"
              />
              Mark as Popular
            </label>
            <label className="flex items-center text-gray-300">
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleChange}
                className="rounded text-blue-600 focus:ring-blue-500 mr-2 bg-gray-700 border-gray-600"
              />
              Activate Plan
            </label>
          </div>

          <div className="col-span-2 flex justify-end space-x-3 mt-4 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PlanModalForm;
