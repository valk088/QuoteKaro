import React, { useState, useEffect } from 'react';
import { Plus, Users, AlertTriangle } from 'lucide-react';
import axios from 'axios';

// Import the new sub-components
import UserStatsCards from '../Components/UserManagementComponent/UserStatsCards.jsx';
import UserFiltersAndSearch from '../Components/UserManagementComponent/UserFiltersAndSearch.jsx';
import UserTable from '../Components/UserManagementComponent/UserTable.jsx';
import UserModalForm from '../Components/UserManagementComponent/UserModalForm.jsx';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // 'all', 'active', 'suspended'
  const [filterPlan, setFilterPlan] = useState('all'); // 'all', 'Basic Plan', 'Pro Plan', 'Enterprise', 'Starter'
  const [selectedUsers, setSelectedUsers] = useState([]); // Array of selected user _ids
  const [selectedUser, setSelectedUser] = useState(null); // Full user object for modal
  const [showUserModal, setShowUserModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Base URL for API calls
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Function to fetch users from the backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/users`);
      setUsers(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users. Please try again later.");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Filter users based on search and filters
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.studioName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user._id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.phone?.includes(searchTerm); // Check against backend _id and studioName

    const matchesStatus = filterStatus === 'all' ||
                          (filterStatus === 'active' && !user.isSuspended) ||
                          (filterStatus === 'suspended' && user.isSuspended);
    const matchesPlan = filterPlan === 'all' || user.plan === filterPlan;

    return matchesSearch && matchesStatus && matchesPlan;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  // Handlers for UserTable
  const handleSelectAllUsers = (e) => {
    if (e.target.checked) {
      setSelectedUsers(paginatedUsers.map(u => u._id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId]
    );
  };

  const handleViewUser = (userId) => {
    const user = users.find(u => u._id === userId);
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleAddCredits = async (userId) => {
    const amount = parseInt(prompt("Enter amount of credits to add:"), 10);
    if (!isNaN(amount) && amount > 0) {
      try {
        await axios.patch(`${API_BASE_URL}/api/users/${userId}/credits`, { amount });
        fetchUsers(); // Re-fetch to update UI
      } catch (err) {
        console.error("Error adding credits:", err);
        setError("Failed to add credits.");
      }
    } else if (amount !== null) {
        alert("Please enter a valid positive number for credits."); // Basic alert for invalid input
    }
  };

  const handleSendEmail = (email) => {
    // Placeholder for sending email functionality
    alert(`Sending email to ${email}`);
    console.log(`Simulating sending email to: ${email}`);
  };

  const handleToggleSuspendActivate = async (user) => {
    const newStatus = !user.isSuspended;
    try {
      await axios.patch(`${API_BASE_URL}/api/users/${user._id}/status`, { isSuspended: newStatus });
      fetchUsers(); // Re-fetch to update UI
    } catch (err) {
      console.error("Error toggling user status:", err);
      setError("Failed to toggle user status.");
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/users/${userId}`);
        fetchUsers(); // Re-fetch to update UI
        setSelectedUsers(prev => prev.filter(id => id !== userId)); // Remove from selection if deleted
      } catch (err) {
        console.error("Error deleting user:", err);
        setError("Failed to delete user.");
      }
    }
  };

  // Handler for saving user changes from modal (Add/Edit)
  const handleSaveUser = async (userData, userId = null) => {
    try {
      if (userId) {
        // Update existing user
        await axios.put(`${API_BASE_URL}/api/users/${userId}`, userData);
      } else {
        // Add new user
        await axios.post(`${API_BASE_URL}/api/users`, userData);
      }
      fetchUsers(); // Re-fetch users after save
    } catch (err) {
      console.error("Error saving user:", err);
      setError(`Failed to save user: ${err.response?.data?.message || err.message}`);
    }
  };

  // Handler for bulk actions from filters/search component
  const handleBulkAction = async (actionType) => {
    if (selectedUsers.length === 0) {
      alert("Please select users for this action.");
      return;
    }

    if (actionType === 'suspend' || actionType === 'activate') {
      if (!window.confirm(`Are you sure you want to ${actionType} ${selectedUsers.length} selected users?`)) {
        return;
      }
      const newSuspendedStatus = actionType === 'suspend';
      try {
        // Loop through selected users and update their status
        await Promise.all(selectedUsers.map(id =>
          axios.patch(`${API_BASE_URL}/api/users/${id}/status`, { isSuspended: newSuspendedStatus })
        ));
        alert(`${selectedUsers.length} users have been ${actionType === 'suspend' ? 'suspended' : 'activated'}.`);
        setSelectedUsers([]); // Clear selection
        fetchUsers(); // Re-fetch data
      } catch (err) {
        console.error(`Error during bulk ${actionType}:`, err);
        setError(`Failed to perform bulk ${actionType}.`);
      }
    } else if (actionType === 'add_credits') {
      const amount = parseInt(prompt("Enter amount of credits to add to selected users:"), 10);
      if (!isNaN(amount) && amount > 0) {
        if (!window.confirm(`Are you sure you want to add ${amount} credits to ${selectedUsers.length} users?`)) {
          return;
        }
        try {
          await Promise.all(selectedUsers.map(id =>
            axios.patch(`${API_BASE_URL}/api/users/${id}/credits`, { amount })
          ));
          alert(`${amount} credits added to ${selectedUsers.length} users.`);
          setSelectedUsers([]);
          fetchUsers();
        } catch (err) {
          console.error("Error during bulk add credits:", err);
          setError("Failed to perform bulk add credits.");
        }
      } else if (amount !== null) {
          alert("Please enter a valid positive number for credits.");
      }
    } else if (actionType === 'delete') {
      if (!window.confirm(`Are you sure you want to DELETE ${selectedUsers.length} selected users? This action cannot be undone.`)) {
        return;
      }
      try {
        await Promise.all(selectedUsers.map(id =>
          axios.delete(`${API_BASE_URL}/api/users/${id}`)
        ));
        alert(`${selectedUsers.length} users deleted successfully.`);
        setSelectedUsers([]);
        fetchUsers();
      } catch (err) {
        console.error("Error during bulk delete:", err);
        setError("Failed to perform bulk delete.");
      }
    } else if (actionType === 'send_email') {
        const selectedEmails = users.filter(user => selectedUsers.includes(user._id)).map(user => user.email);
        alert(`Simulating sending email to: ${selectedEmails.join(', ')}`);
        // In a real app, you'd trigger your email sending service here
        setSelectedUsers([]); // Clear selection after action
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Users...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-red-500 text-xl flex items-center">
          <AlertTriangle className="mr-3" size={24} />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <Users className="mr-3" size={32} />
              User Management
            </h1>
            <p className="text-gray-400 mt-1">Manage users, credits, and account status.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                setSelectedUser(null); // For adding new user
                setShowUserModal(true);
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add New User
            </button>
          </div>
        </div>

        {/* Stats Cards Component */}
        <UserStatsCards users={users} />

        {/* Search and Filters Component */}
        <UserFiltersAndSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterPlan={filterPlan}
          setFilterPlan={setFilterPlan}
          showBulkActions={showBulkActions}
          setShowBulkActions={setShowBulkActions}
          selectedUsersLength={selectedUsers.length}
          handleBulkAction={handleBulkAction}
        />

        {/* Users Table Component */}
        <UserTable
          users={paginatedUsers}
          selectedUsers={selectedUsers}
          handleSelectAllUsers={handleSelectAllUsers}
          handleSelectUser={handleSelectUser}
          handleViewUser={handleViewUser}
          handleToggleSuspendActivate={handleToggleSuspendActivate}
          handleAddCredits={handleAddCredits}
          handleSendEmail={handleSendEmail}
          handleDeleteUser={handleDeleteUser} 
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />

        {/* User Modal Form Component */}
        {showUserModal && (
          <UserModalForm
            user={selectedUser}
            onClose={() => setShowUserModal(false)}
            onSave={handleSaveUser}
          />
        )}
      </div>
    </div>
  );
};

export default UserManagement;
