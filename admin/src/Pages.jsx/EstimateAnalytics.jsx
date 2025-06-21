import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { TrendingUp, AlertTriangle } from 'lucide-react';

// Import the new sub-components
import EstimateSummaryCards from '../Components/EstimateAnalyticsComponent/EstimateSummaryCards.jsx';
import EstimateFilters from '../Components/EstimateAnalyticsComponent/EstimateFilters.jsx';
import EstimateCharts from '../Components/EstimateAnalyticsComponent/EstimateCharts.jsx';
import EstimateTable from '../Components/EstimateAnalyticsComponent/EstimateTable.jsx';

const EstimateAnalytics = () => {
  const [estimates, setEstimates] = useState([]);
  const [usersLookup, setUsersLookup] = useState({}); // To store user details for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    user: 'all',
    location: 'all',
    service: 'all', // Maps to functionName in schema, or serviceName in services array
    status: 'all', // draft, sent, viewed, accepted
  });

  const [currentPage, setCurrentPage] = useState(1);
  const estimatesPerPage = 10;

  // Base URL for API calls
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Function to fetch estimates and users from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const [estimatesResponse, usersResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/estimates`), // Fetches all estimates
        axios.get(`${API_BASE_URL}/api/users`)      // Fetches all users for filters and display
      ]);

      // Map dummy data status ('paid') to schema status ('accepted')
      const processedEstimates = estimatesResponse.data.estimates.map(est => ({
        ...est,
        status: est.status === 'paid' ? 'accepted' : est.status, // Adjust if your backend returns 'paid'
        // Ensure service name is accessible directly if your analytics depends on it
        // Assuming analytics needs a single service string, take the first one or functionName
        service: est.functionName || (est.services && est.services.length > 0 ? est.services[0].serviceName : 'N/A'),
        value: est.netTotal, // Map value to netTotal
      }));
      setEstimates(processedEstimates);

      // Create a lookup map for users (id -> user object)
      const lookup = {};
      usersResponse.data.forEach(user => {
        lookup[user._id] = user;
      });
      setUsersLookup(lookup);

      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load estimates or user data. Please try again later.");
      setEstimates([]);
      setUsersLookup({});
    } finally {
      setLoading(false);
    }
  };

  // useEffect to fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Memoized filtered estimates for performance
  const filteredEstimates = useMemo(() => {
    return estimates.filter(estimate => {
      // Use createdAt for date filtering, as it's consistent
      const estimateDate = new Date(estimate.createdAt);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      let end = filters.endDate ? new Date(filters.endDate) : null;

      // Adjust end date to include the entire day
      if (end) {
        end.setHours(23, 59, 59, 999);
      }

      const matchesDate = (!start || estimateDate >= start) && (!end || estimateDate <= end);
      // Filter by user._id for populated userId
      const matchesUser = filters.user === 'all' || estimate.userId?._id === filters.user;
      const matchesLocation = filters.location === 'all' || estimate.location === filters.location;
      // Filter by either functionName or serviceName from services array
      const matchesService = filters.service === 'all' ||
                             estimate.functionName === filters.service ||
                             (estimate.services && estimate.services.some(s => s.serviceName === filters.service));
      const matchesStatus = filters.status === 'all' || estimate.status === filters.status;

      return matchesDate && matchesUser && matchesLocation && matchesService && matchesStatus;
    });
  }, [estimates, filters]);

  // Derived analytics data
  const totalEstimates = filteredEstimates.length;
  const totalValue = filteredEstimates.reduce((sum, e) => sum + e.netTotal, 0); // Use netTotal
  const averageValue = totalEstimates > 0 ? (totalValue / totalEstimates).toFixed(2) : 0;
  const acceptedEstimates = filteredEstimates.filter(e => e.status === 'accepted').length;

  // Helper to get unique values for filters from ALL estimates
  const uniqueUsers = useMemo(() => {
    const userIds = new Set();
    const uniqueUserObjects = [];
    estimates.forEach(est => {
      if (est.userId && est.userId._id && !userIds.has(est.userId._id)) {
        userIds.add(est.userId._id);
        uniqueUserObjects.push(est.userId);
      }
    });
    return uniqueUserObjects;
  }, [estimates]);

  const uniqueLocations = useMemo(() => {
    return [...new Set(estimates.map(e => e.location).filter(Boolean))]; // Filter out null/undefined
  }, [estimates]);

  const uniqueServices = useMemo(() => {
    const services = new Set();
    estimates.forEach(e => {
      if (e.functionName) services.add(e.functionName);
      if (e.services) {
        e.services.forEach(s => services.add(s.serviceName));
      }
    });
    return [...services];
  }, [estimates]);


  // Pagination
  const totalPages = Math.ceil(filteredEstimates.length / estimatesPerPage);
  const paginatedEstimates = filteredEstimates.slice(
    (currentPage - 1) * estimatesPerPage,
    currentPage * estimatesPerPage
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Estimates Data...
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
              <TrendingUp className="mr-3" size={32} />
              Estimate Analytics
            </h1>
            <p className="text-gray-400 mt-1">Deep insights into user-generated estimates.</p>
          </div>
        </div>

        {/* Analytics Summary Cards Component */}
        <EstimateSummaryCards
          totalEstimates={totalEstimates}
          totalValue={totalValue}
          averageValue={averageValue}
          acceptedEstimates={acceptedEstimates}
        />

        {/* Filters Component */}
        <EstimateFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          uniqueUsers={uniqueUsers}
          uniqueLocations={uniqueLocations}
          uniqueServices={uniqueServices}
        />

        {/* Charts Section Component */}
        <EstimateCharts
          filteredEstimates={filteredEstimates}
          usersLookup={usersLookup}
        />

        {/* Detailed Estimates Table Component */}
        <EstimateTable
          estimates={paginatedEstimates}
          usersLookup={usersLookup}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default EstimateAnalytics;
