import React, { useState, useEffect } from 'react';
import { Users, Mail, Phone, MapPin, Calendar, CreditCard, X, TrendingUp, Star } from 'lucide-react';
import axios from 'axios';

const UserModalForm = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: user?.studioName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.address?.city && user?.address?.state ? `${user.address.city}, ${user.address.state}` : '',
    plan: user?.plan || 'Starter',
    credits: user?.left_credits || 0,
    status: user?.isSuspended ? 'suspended' : 'active', // Map isSuspended to status string
    firebaseUID: user?.firebaseUID || '', // Include firebaseUID for creation/reference
    description: user?.caption || '',
    website: user?.website || '',
    phone2: user?.phone2 || '',
    socialLinks: {
      instagram: user?.socialLinks?.instagram || '',
      facebook: user?.socialLinks?.facebook || '',
      youtube: user?.socialLinks?.youtube || '',
    },
    address: {
      d_address: user?.address?.d_address || '',
      city: user?.address?.city || '',
      state: user?.address?.state || '',
      pincode: user?.address?.pincode || '',
    },
    policies: user?.policies || '',
    notes: user?.notes || '',
    planExpiresAt: user?.planExpiresAt ? new Date(user.planExpiresAt).toISOString().split('T')[0] : '', // Format for date input
    billingCycle: user?.billingCycle || 'monthly',
    selectedEstimateTheme: user?.selectedEstimateTheme || 'simple',
  });

  // Dummy list of available plans for the dropdown
  const availablePlans = ['Starter', 'Basic Plan', 'Pro Plan', 'Enterprise'];

  useEffect(() => {
    // If user object changes (e.g., when editing a different user), update form data
    if (user) {
      setFormData({
        name: user.studioName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.address?.city && user.address?.state ? `${user.address.city}, ${user.address.state}` : '',
        plan: user.plan || 'Starter',
        credits: user.left_credits || 0,
        status: user.isSuspended ? 'suspended' : 'active',
        firebaseUID: user.firebaseUID || '',
        description: user.caption || '',
        website: user.website || '',
        phone2: user.phone2 || '',
        socialLinks: {
          instagram: user.socialLinks?.instagram || '',
          facebook: user.socialLinks?.facebook || '',
          youtube: user.socialLinks?.youtube || '',
        },
        address: {
          d_address: user.address?.d_address || '',
          city: user.address?.city || '',
          state: user.address?.state || '',
          pincode: user.address?.pincode || '',
        },
        policies: user.policies || '',
        notes: user.notes || '',
        planExpiresAt: user.planExpiresAt ? new Date(user.planExpiresAt).toISOString().split('T')[0] : '',
        billingCycle: user.billingCycle || 'monthly',
        selectedEstimateTheme: user.selectedEstimateTheme || 'simple',
      });
    } else {
      // Reset form for new user
      setFormData({
        name: '', email: '', phone: '', location: '', plan: 'Starter', credits: 0, status: 'active',
        firebaseUID: '', description: '', website: '', phone2: '',
        socialLinks: { instagram: '', facebook: '', youtube: '' },
        address: { d_address: '', city: '', state: '', pincode: '' },
        policies: '', notes: '', planExpiresAt: '', billingCycle: 'monthly', selectedEstimateTheme: 'simple',
      });
    }
  }, [user]); // Re-run when `user` prop changes


  const handleChange = (e) => {
    const { name, value } = e.target;
    // Handle nested properties (e.g., address, socialLinks)
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = () => {
    // Map form data back to schema structure for saving
    const dataToSave = {
      studioName: formData.name,
      email: formData.email,
      phone: formData.phone,
      firebaseUID: formData.firebaseUID,
      caption: formData.description,
      website: formData.website,
      phone2: formData.phone2,
      socialLinks: formData.socialLinks,
      address: formData.address,
      policies: formData.policies,
      notes: formData.notes,
      plan: formData.plan,
      left_credits: formData.credits, // credits from form map to left_credits in schema
      isSuspended: formData.status === 'suspended', // Map status string to boolean
      planExpiresAt: formData.planExpiresAt || null,
      billingCycle: formData.billingCycle,
      selectedEstimateTheme: formData.selectedEstimateTheme,
      // total_estimates, total_clients, total_credits, used_credits, totalturnover are managed by backend/other processes
    };
    onSave(dataToSave, user?._id); // Pass _id if editing existing user
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white flex items-center">
            <Users className="mr-2" size={24} />
            {user ? `Edit User - ${user.studioName}` : 'Add New User'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Summary (Display only for existing users) */}
          {user && (
            <div className="bg-gray-700 rounded-lg p-4">
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-white text-2xl font-bold">{user.studioName?.charAt(0) || 'N/A'}</span>
                </div>
                <h3 className="text-white font-semibold">{user.studioName}</h3>
                <p className="text-gray-400 text-sm">{user._id}</p>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                  !user.isSuspended
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                }`}>
                  {!user.isSuspended ? '● Active' : '● Suspended'}
                </span>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex items-center text-gray-300">
                  <Mail size={16} className="mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center text-gray-300">
                  <Phone size={16} className="mr-2" />
                  {user.phone}
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin size={16} className="mr-2" />
                  {user.address?.city}, {user.address?.state}
                </div>
                <div className="flex items-center text-gray-300">
                  <Calendar size={16} className="mr-2" />
                  Joined {new Date(user.joinedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {/* Editable Fields */}
          <div className={`${user ? 'col-span-2' : 'col-span-3'} space-y-4`}>
            <h4 className="text-white font-medium">Account Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Studio Name</label>
                <input
                  type="text"
                  name="name" // Map to studioName
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Primary Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Secondary Phone</label>
                <input
                  type="text"
                  name="phone2"
                  value={formData.phone2}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Description / Caption</label>
                <textarea
                  name="description" // Map to caption
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-20"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Website</label>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Firebase UID</label>
                <input
                  type="text"
                  name="firebaseUID"
                  value={formData.firebaseUID}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>

            <h4 className="text-white font-medium mt-6">Plan & Credits</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current Plan</label>
                <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  {availablePlans.map(p => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Credits Left</label>
                <input
                  type="number"
                  name="credits" // Map to left_credits
                  value={formData.credits}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Account Status</label>
                <select
                  name="status" // Map to isSuspended
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Plan Expiry Date</label>
                <input
                  type="date"
                  name="planExpiresAt"
                  value={formData.planExpiresAt}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Billing Cycle</label>
                <select
                  name="billingCycle"
                  value={formData.billingCycle}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Estimate Theme</label>
                <input
                  type="text"
                  name="selectedEstimateTheme"
                  value={formData.selectedEstimateTheme}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <h4 className="text-white font-medium mt-6">Address</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Detailed Address</label>
                <input
                  type="text"
                  name="address.d_address"
                  value={formData.address.d_address}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">City</label>
                <input
                  type="text"
                  name="address.city"
                  value={formData.address.city}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">State</label>
                <input
                  type="text"
                  name="address.state"
                  value={formData.address.state}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Pincode</label>
                <input
                  type="text"
                  name="address.pincode"
                  value={formData.address.pincode}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <h4 className="text-white font-medium mt-6">Social Links</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Instagram</label>
                <input
                  type="text"
                  name="socialLinks.instagram"
                  value={formData.socialLinks.instagram}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Facebook</label>
                <input
                  type="text"
                  name="socialLinks.facebook"
                  value={formData.socialLinks.facebook}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">YouTube</label>
                <input
                  type="text"
                  name="socialLinks.youtube"
                  value={formData.socialLinks.youtube}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
            
            <h4 className="text-white font-medium mt-6">Other Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Policies</label>
                <textarea
                  name="policies"
                  value={formData.policies}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-20"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 h-20"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModalForm;
