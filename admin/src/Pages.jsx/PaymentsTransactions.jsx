import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { CreditCard, Download } from 'lucide-react';

// Import the new sub-components
import PaymentSummaryCards from '../Components/PaymentsTransactionsComponent/PaymentSummaryCards.jsx';
import PaymentFilters from '../Components/PaymentsTransactionsComponent/PaymentFilters.jsx';
import PaymentCharts from '../Components/PaymentsTransactionsComponent/PaymentCharts.jsx';
import PaymentTable from '../Components/PaymentsTransactionsComponent/PaymentTable.jsx';

const PaymentsTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [usersLookup, setUsersLookup] = useState({}); // To store user details for display
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    user: 'all',
    method: 'all',
    status: 'all',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const transactionsPerPage = 10; // Renamed from usersPerPage for clarity

  // Base URL for API calls
  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // Function to fetch transactions and users from the backend
  const fetchData = async () => {
    setLoading(true);
    try {
      const [transactionsResponse, usersResponse] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/transactions`),
        axios.get(`${API_BASE_URL}/api/users`) // Fetch users for the filter dropdown and user display in table
      ]);

      setTransactions(transactionsResponse.data);

      // Create a lookup map for users (id -> user object)
      const lookup = {};
      usersResponse.data.forEach(user => {
        lookup[user._id] = user;
      });
      setUsersLookup(lookup);

      setError(null);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load transactions or user data. Please try again later.");
      setTransactions([]);
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

  // Memoized filtered transactions for performance
  const filteredTransactions = useMemo(() => {
    return transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;

      const matchesDate = (!start || transactionDate >= start) && (!end || transactionDate <= end);
      const matchesUser = filters.user === 'all' || transaction.userId._id === filters.user; // Match by userId._id
      const matchesPaymentMode = filters.method === 'all' || transaction.method === filters.method;
      const matchesStatus = filters.status === 'all' || transaction.status === filters.status;

      return matchesDate && matchesUser && matchesPaymentMode && matchesStatus;
    });
  }, [transactions, filters]);

  // Derived analytics data
  const totalTransactionsCount = filteredTransactions.length;
  const totalRevenue = filteredTransactions
    .filter(t => t.status === 'success')
    .reduce((sum, t) => sum + t.amount, 0);
  const completedTransactions = filteredTransactions.filter(t => t.status === 'success').length;
  const pendingTransactions = filteredTransactions.filter(t => t.status === 'pending').length;

  // Helper to get unique values for filters from ALL transactions (not just filtered)
  const uniqueUsers = useMemo(() => {
    const userIds = new Set();
    const uniqueUserObjects = [];
    transactions.forEach(t => {
      if (t.userId && !userIds.has(t.userId._id)) {
        userIds.add(t.userId._id);
        uniqueUserObjects.push(t.userId);
      }
    });
    return uniqueUserObjects;
  }, [transactions]);

  const uniquePaymentModes = useMemo(() => {
    return [...new Set(transactions.map(t => t.method))];
  }, [transactions]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / transactionsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * transactionsPerPage,
    currentPage * transactionsPerPage
  );

  // Function to export data as CSV
  const exportToCSV = () => {
    const headers = ["ID", "User Name", "User Email", "Date", "Type", "Amount", "Payment Mode", "Status"];
    const rows = filteredTransactions.map(t => [
      t._id,
      usersLookup[t.userId?._id]?.studioName || `User ${t.userId?._id?.slice(-4)}`,
      usersLookup[t.userId?._id]?.email || 'N/A',
      new Date(t.date).toLocaleDateString(),
      t.type.replace('_', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
      t.amount,
      t.method,
      t.status,
    ]);

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Payments Data...
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
              <CreditCard className="mr-3" size={32} />
              Payments & Transactions
            </h1>
            <p className="text-gray-400 mt-1">Track and manage all financial operations.</p>
          </div>
          {/* Export CSV button moved to PaymentTable */}
        </div>

        {/* Summary Cards Component */}
        <PaymentSummaryCards
          totalRevenue={totalRevenue}
          totalTransactionsCount={totalTransactionsCount}
          completedTransactions={completedTransactions}
          pendingTransactions={pendingTransactions}
        />

        {/* Filters Component */}
        <PaymentFilters
          filters={filters}
          handleFilterChange={handleFilterChange}
          uniqueUsers={uniqueUsers}
          uniquePaymentModes={uniquePaymentModes}
        />

        {/* Charts Section Component */}
        <PaymentCharts
          filteredTransactions={filteredTransactions}
        />

        {/* Transactions Table Component */}
        <PaymentTable
          transactions={paginatedTransactions}
          exportToCSV={exportToCSV}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default PaymentsTransactions;
