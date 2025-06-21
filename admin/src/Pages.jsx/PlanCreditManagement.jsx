import React, { useState, useEffect } from 'react';
import { Plus, CreditCard, AlertTriangle } from 'lucide-react';
import axios from 'axios';

// Import the new sub-components
import PlanStatsCards from '../Components/PlanManagementComponent/PlanStatsCards.jsx';
import PlanFiltersAndSearch from '../Components/PlanManagementComponent/PlanFiltersAndSearch.jsx';
import PlanTable from '../Components/PlanManagementComponent/PlanTable.jsx';
import PlanModalForm from '../Components/PlanManagementComponent/PlanModalForm.jsx';

const PlanCreditManagement = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
 

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [showPlanModal, setShowPlanModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Base URL for API calls
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Function to fetch plans from the backend
  const fetchPlans = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/plans`);
      setPlans(response.data);
      
    } catch (err) {
      console.error("Error fetching plans:", err);
      
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch plans on component mount
  useEffect(() => {
    fetchPlans();
  }, []);

  // Filter and sort plans based on search, filters, and display order
  const filteredAndSortedPlans = plans.filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            (plan._id || '').toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = filterStatus === 'all' ||
                            (filterStatus === 'active' && plan.isActive) ||
                            (filterStatus === 'inactive' && !plan.isActive);

      const matchesType = filterType === 'all' || plan.type === filterType;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      // Sort: 'subscription' plans first, then 'one-time'
      if (a.type === 'subscription' && b.type === 'one-time') return -1;
      if (a.type === 'one-time' && b.type === 'subscription') return 1;
      // Within same type, sort alphabetically by name
      return a.name.localeCompare(b.name);
    });

  // Function to open the modal for adding a new plan
  const handleAddNewPlan = () => {
    setSelectedPlan(null); // Clear selected plan to indicate adding mode
    setShowPlanModal(true);
  };

  // Function to open the modal for editing an existing plan
  const handleEditPlan = (plan) => {
    setSelectedPlan(plan);
    setShowPlanModal(true);
  };

  // Function to delete a plan via API
  const handleDeletePlan = async (id) => {
    if (window.confirm('Are you sure you want to delete this plan? This action cannot be undone.')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/plans/${id}`);
        fetchPlans(); // Re-fetch plans to update UI
      } catch (err) {
        console.error("Error deleting plan:", err);
        
      }
    }
  };

  // Function to toggle plan status (activate/deactivate) via API
  const handleToggleStatus = async (plan) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/plans/${plan._id}`, { isActive: !plan.isActive });
      fetchPlans(); // Re-fetch plans to update UI
    } catch (err) {
      console.error("Error toggling plan status:", err);
      
    }
  };

  // Function to toggle plan popularity via API
  const handleTogglePopular = async (plan) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/plans/${plan._id}`, { isPopular: !plan.isPopular });
      fetchPlans(); // Re-fetch plans to update UI
    } catch (err) {
      console.error("Error toggling plan popularity:", err);
      
    }
  };

  // Function to save/update plan via API
  const handleSavePlan = async (planToSave) => {
    try {
      if (selectedPlan) {
        // Editing existing plan (use _id from the fetched plan)
        await axios.put(`${API_BASE_URL}/api/plans/${planToSave._id}`, planToSave);
      } else {
        // Adding new plan (remove _id if present, as MongoDB will generate it)
        const { _id, ...newPlanData } = planToSave;
        await axios.post(`${API_BASE_URL}/api/plans`, newPlanData);
      }
      fetchPlans(); // Re-fetch plans to update UI
    } catch (err) {
      console.error("Error saving plan:", err);
     
    }
  };

  

  return (
    <div className="min-h-screen bg-gray-900 p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center">
              <CreditCard className="mr-3" size={32} />
              Plan & Credit Management
            </h1>
            <p className="text-gray-400 mt-1">Control your subscription and credit plans.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleAddNewPlan}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Add New Plan
            </button>
          </div>
        </div>

        {/* Stats Cards Component */}
        <PlanStatsCards plans={plans} />

        {/* Search and Filters Component */}
        <PlanFiltersAndSearch
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
          filterType={filterType}
          setFilterType={setFilterType}
        />

        {/* Plans Table Component */}
        <PlanTable
          plans={filteredAndSortedPlans}
          handleEditPlan={handleEditPlan}
          handleToggleStatus={handleToggleStatus}
          handleTogglePopular={handleTogglePopular}
          handleDeletePlan={handleDeletePlan}
        />

        {/* Plan Add/Edit Modal Form Component */}
        {showPlanModal && (
          <PlanModalForm
            plan={selectedPlan}
            onClose={() => setShowPlanModal(false)}
            onSave={handleSavePlan}
          />
        )}
      </div>
    </div>
  );
};

export default PlanCreditManagement;
