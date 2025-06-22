import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Mail, Plus, AlertTriangle } from 'lucide-react';

// Import new sub-components
import EmailStatsCards from '../Components/EmailNotificationSystemComponent/EmailStatsCards.jsx';
import EmailCharts from '../Components/EmailNotificationSystemComponent/EmailCharts.jsx';
import CampaignsTable from '../Components/EmailNotificationSystemComponent/CampaignsTable.jsx';
import BroadcastNotificationsTable from '../Components/EmailNotificationSystemComponent/BroadcastNotificationsTable.jsx';
import EmailTemplatesManager from '../Components/EmailNotificationSystemComponent/EmailTemplatesManager.jsx';
import TriggerAutomationSection from '../Components/EmailNotificationSystemComponent/TriggerAutomationSection.jsx';

const EmailNotificationSystem = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [notifications, setNotifications] = useState([]); // Notifications created by admin, e.g., broadcasts
  const [emailTemplates, setEmailTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filters, setFilters] = useState({
    campaignStatus: 'all',
    notificationCategory: 'all', // Changed from notificationType to notificationCategory
  });

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

  // --- Fetch Data Functions ---
  const fetchCampaigns = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/campaigns`);
      setCampaigns(response.data.campaigns);
    } catch (err) {
      console.error("Error fetching campaigns:", err);
      setError("Failed to load campaigns.");
    }
  };

  const fetchBroadcastNotifications = async () => {
    // FIX: Added the axios.get call to fetch ALL notifications for admin view
    try {
      const response = await axios.get(`${API_BASE_URL}/api/notifications`);
      // You can still filter on the frontend if you only want certain types (e.g., sourceCampaign or 'general')
      const allNotifications = response.data.notifications;
      setNotifications(allNotifications.filter(n => n.sourceCampaign || n.category === 'general' || n.category === 'system' || n.category === 'updates')); // Example filtering
    } catch (err) {
      console.error("Error fetching notifications:", err);
      setError("Failed to load broadcast notifications.");
    }
  };

  const fetchEmailTemplates = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/email-templates`);
      setEmailTemplates(response.data.templates);
    } catch (err) {
      console.error("Error fetching email templates:", err);
      setError("Failed to load email templates.");
    }
  };

  // --- Initial Data Fetch ---
  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      setError(null);
      await Promise.all([
        fetchCampaigns(),
        fetchBroadcastNotifications(),
        fetchEmailTemplates(),
      ]);
      setLoading(false);
    };
    loadAllData();
  }, []); // Empty dependency array means this runs once on mount

  // --- Handlers for Campaigns ---
  const handleCreateCampaign = async () => {
    const name = prompt("Enter new campaign name:");
    if (name) {
      try {
        await axios.post(`${API_BASE_URL}/api/campaigns`, { name, type: 'cold_email', status: 'draft' });
        fetchCampaigns();
      } catch (err) {
        alert("Failed to create campaign: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEditCampaign = async (id) => {
    alert(`Editing campaign ${id}. (Implementation: Open a modal with campaign details)`);
    // In a real app, you'd fetch the specific campaign and open a modal for editing
  };

  const handleDeleteCampaign = async (id) => {
    if (window.confirm('Are you sure you want to delete this campaign?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/campaigns/${id}`);
        fetchCampaigns();
      } catch (err) {
        alert("Failed to delete campaign: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleSendCampaign = async (id) => {
    if (window.confirm('Are you sure you want to send this campaign? This will generate notifications/emails.')) {
      try {
        await axios.post(`${API_BASE_URL}/api/campaigns/${id}/send`);
        fetchCampaigns(); // Update campaign status and counts
        fetchBroadcastNotifications(); // Refresh notifications as new ones might be created
      } catch (err) {
        alert("Failed to send campaign: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleToggleCampaignStatus = async (campaign) => {
    let newStatus;
    if (campaign.status === 'active') {
      newStatus = 'paused';
    } else if (campaign.status === 'paused') {
      newStatus = 'active';
    } else {
      return; // Cannot toggle status for draft, completed, or cancelled
    }

    if (window.confirm(`Are you sure you want to ${newStatus} this campaign?`)) {
      try {
        await axios.put(`${API_BASE_URL}/api/campaigns/${campaign._id}`, { status: newStatus });
        fetchCampaigns();
      } catch (err) {
        alert("Failed to update campaign status: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // --- Handlers for Notifications (Admin View) ---
  const handleDeleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/notifications/${id}`);
        fetchBroadcastNotifications(); // Refresh admin notifications
      } catch (err) {
        alert("Failed to delete notification: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // --- Handlers for Email Templates ---
  const handleCreateTemplate = async () => {
    const name = prompt("Enter new template name:");
    const subject = prompt("Enter template subject:");
    const body = prompt("Enter template body (HTML allowed):");
    if (name && subject && body) {
      try {
        await axios.post(`${API_BASE_URL}/api/email-templates`, { name, subject, body });
        fetchEmailTemplates();
      } catch (err) {
        alert("Failed to create template: " + (err.response?.data?.message || err.message));
      }
    }
  };

  const handleEditTemplate = async (id) => {
    alert(`Editing template ${id}. (Implementation: Open a modal with template details)`);
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this email template?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/email-templates/${id}`);
        fetchEmailTemplates();
      } catch (err) {
        alert("Failed to delete template: " + (err.response?.data?.message || err.message));
      }
    }
  };

  // --- General Filter Handler ---
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  // --- Filtered Data (Memoized) ---
  const filteredCampaigns = useMemo(() => {
    return campaigns.filter(campaign => {
      const matchesStatus = filters.campaignStatus === 'all' || campaign.status === filters.campaignStatus;
      return matchesStatus;
    });
  }, [campaigns, filters.campaignStatus]);

  const filteredBroadcastNotifications = useMemo(() => {
    return notifications.filter(notification => {
      // For broadcast notifications, filter by category
      const matchesCategory = filters.notificationCategory === 'all' || notification.category === filters.notificationCategory;
      return matchesCategory;
    });
  }, [notifications, filters.notificationCategory]);

  // --- Global Email Stats Calculation ---
  const totalEmailsSent = campaigns.reduce((sum, campaign) => sum + campaign.sentCount, 0);
  const totalOpens = campaigns.reduce((sum, campaign) => sum + campaign.opensCount, 0);
  const totalClicks = campaigns.reduce((sum, campaign) => sum + campaign.clicksCount, 0);

  const overallOpenRate = totalEmailsSent > 0 ? ((totalOpens / totalEmailsSent) * 100).toFixed(2) : 0;
  const overallCTR = totalOpens > 0 ? ((totalClicks / totalOpens) * 100).toFixed(2) : 0;
  const successfulDeliveries = totalEmailsSent; // Assuming all sent are successful unless a 'failed' count is added to campaign model

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 p-6 flex items-center justify-center">
        <div className="text-white text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Email & Notification Data...
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
              <Mail className="mr-3" size={32} />
              Email & Notification System
            </h1>
            <p className="text-gray-400 mt-1">Marketing & transactional messaging control.</p>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCreateCampaign}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center"
            >
              <Plus size={16} className="mr-2" />
              Create New Campaign
            </button>
          </div>
        </div>

        {/* Global Email Stats Cards */}
        <EmailStatsCards
          totalEmailsSent={totalEmailsSent}
          overallOpenRate={overallOpenRate}
          overallCTR={overallCTR}
          successfulDeliveries={successfulDeliveries}
        />

        {/* Email Stats Charts */}
        <EmailCharts campaigns={campaigns} />

        {/* Cold Email Campaigns Table */}
        <CampaignsTable
          filteredCampaigns={filteredCampaigns}
          filters={filters}
          handleFilterChange={handleFilterChange}
          onEdit={handleEditCampaign}
          onDelete={handleDeleteCampaign}
          onSend={handleSendCampaign}
          onToggleStatus={handleToggleCampaignStatus}
        />

        {/* Broadcast Notifications Table */}
        <BroadcastNotificationsTable
          filteredNotifications={filteredBroadcastNotifications}
          filters={filters}
          handleFilterChange={handleFilterChange}
          onDeleteNotification={handleDeleteNotification}
        />

        {/* Trigger-based Automation Section */}
        <TriggerAutomationSection onAddTrigger={() => alert("Add New Trigger functionality (modal/form) goes here.")} />

        {/* Email Templates Manager */}
        <EmailTemplatesManager
          emailTemplates={emailTemplates}
          onEditTemplate={handleEditTemplate}
          onDeleteTemplate={handleDeleteTemplate}
          onCreateTemplate={handleCreateTemplate}
        />

      </div>
    </div>
  );
};

export default EmailNotificationSystem;
