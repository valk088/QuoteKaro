import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Bell, Search, Trash2 } from 'lucide-react';
import {
  CheckCircle, AlertCircle, Info, AlertTriangle, Settings, Check, X, CheckCheck
} from 'lucide-react';
import { useUser } from "../context/UserContext";

// Import new sub-components
import ClientNotificationSidebar from './EmailNotificationSystemComponent/ClientNotificationSidebar.jsx';
import ClientNotificationList from './EmailNotificationSystemComponent/ClientNotificationList.jsx';


const NotificationMainn = () => {
   
  const { userData, loading: userLoading } = useUser();

  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';
 

  //  if (userLoading || !userData) return null; 
  // const userId = userData._id || userData.id;
  const DUMMY_USER_ID = "6855864c3fae02dc1914c532";
  // --- Fetch Notifications ---
  const fetchUserNotifications = async () => {
    setLoading(true);
    try {
      // Fetch notifications for the specific user
      const response = await axios.get(`${API_BASE_URL}/api/notifications/user/${DUMMY_USER_ID}`);
      setNotifications(response.data.notifications);
      setError(null);
    } catch (err) {
      console.error("Error fetching user notifications:", err);
      setError("Failed to load your notifications. Please try again later.");
      setNotifications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserNotifications();
  }, [DUMMY_USER_ID]); // Re-fetch if userId changes (important for real auth)

  // --- Helper Functions ---
  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'error': return <AlertCircle className="text-red-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'info': return <Info className="text-blue-500" size={20} />;
      // Categories can also have icons if needed
      case 'billing': return <Bell className="text-purple-500" size={20} />;
      case 'updates': return <Bell className="text-blue-500" size={20} />;
      case 'system': return <Bell className="text-yellow-500" size={20} />;
      case 'security': return <Bell className="text-red-500" size={20} />;
      case 'reports': return <Bell className="text-green-500" size={20} />;
      case 'account': return <Bell className="text-indigo-500" size={20} />;
      default: return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getNotificationBorder = (type) => {
    switch(type) {
      case 'success': return 'border-l-green-500';
      case 'error': return 'border-l-red-500';
      case 'warning': return 'border-l-yellow-500';
      case 'info': return 'border-l-blue-500';
      // For general styling based on category, you can map category to a color if 'type' is not strict enough
      case 'billing': return 'border-l-purple-500';
      case 'security': return 'border-l-red-500';
      case 'updates': return 'border-l-blue-500';
      case 'system': return 'border-l-yellow-500';
      case 'reports': return 'border-l-green-500';
      case 'account': return 'border-l-indigo-500';
      default: return 'border-l-gray-300';
    }
  };

  // --- Filtered Notifications ---
  const filteredNotifications = useMemo(() => {
    return notifications.filter(notification => {
      const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            notification.message.toLowerCase().includes(searchTerm.toLowerCase());

      if (filter === 'all') return matchesSearch;
      if (filter === 'unread') return !notification.read && matchesSearch;
      return notification.category === filter && matchesSearch;
    });
  }, [notifications, filter, searchTerm]);

  // --- Notification Actions ---
  const markAsRead = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/notifications/${id}`, { read: true });
      fetchUserNotifications(); // Re-fetch to update UI and counts
    } catch (err) {
      console.error("Error marking as read:", err);
      alert("Failed to mark notification as read.");
    }
  };

  const markAsUnread = async (id) => {
    try {
      await axios.patch(`${API_BASE_URL}/api/notifications/${id}`, { read: false });
      fetchUserNotifications();
    } catch (err) {
      console.error("Error marking as unread:", err);
      alert("Failed to mark notification as unread.");
    }
  };

  const deleteNotification = async (id) => {
    if (window.confirm('Are you sure you want to delete this notification?')) {
      try {
        await axios.delete(`${API_BASE_URL}/api/notifications/${id}`);
        fetchUserNotifications();
        setSelectedNotifications(prev => {
          const newSet = new Set(prev);
          newSet.delete(id);
          return newSet;
        });
      } catch (err) {
        console.error("Error deleting notification:", err);
        alert("Failed to delete notification.");
      }
    }
  };

  const markAllAsRead = async () => {
    const unreadIds = notifications.filter(n => !n.read).map(n => n._id);
    if (unreadIds.length === 0) return;

    if (window.confirm('Mark all unread notifications as read?')) {
      try {
        await axios.post(`${API_BASE_URL}/api/notifications/bulk-update`, { ids: unreadIds, updateFields: { read: true } });
        fetchUserNotifications();
      } catch (err) {
        console.error("Error marking all as read:", err);
        alert("Failed to mark all notifications as read.");
      }
    }
  };

  const deleteSelected = async () => {
    if (selectedNotifications.size === 0) return;

    if (window.confirm(`Are you sure you want to delete ${selectedNotifications.size} selected notifications?`)) {
      try {
        await axios.post(`${API_BASE_URL}/api/notifications/bulk-delete`, { ids: Array.from(selectedNotifications) });
        fetchUserNotifications();
        setSelectedNotifications(new Set()); // Clear selection
      } catch (err) {
        console.error("Error deleting selected notifications:", err);
        alert("Failed to delete selected notifications.");
      }
    }
  };

  const toggleSelectNotification = (id) => {
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Memoized categories for sidebar to prevent unnecessary re-renders
  const categories = useMemo(() => {
    const baseCategories = [
      { id: 'all', label: 'All', count: notifications.length },
      { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    ];
    // Dynamically add categories based on fetched notifications
    const dynamicCategories = [...new Set(notifications.map(n => n.category))]
      .sort() // Sort alphabetically for consistent order
      .map(cat => ({
        id: cat,
        label: cat.charAt(0).toUpperCase() + cat.slice(1), // Capitalize for display
        count: notifications.filter(n => n.category === cat).length
      }));

    return [...baseCategories, ...dynamicCategories];
  }, [notifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-gray-700 text-xl flex items-center">
          <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading Notifications...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-red-500 text-xl flex items-center">
          <AlertTriangle className="mr-3" size={24} />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl text-white">
              <Bell size={24} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Notifications</h1>
              <p className="text-gray-600">Stay updated with your latest activities</p>
            </div>
          </div>

          {unreadCount > 0 && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-800 font-medium">
                  You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
                </span>
              </div>
              <button
                onClick={markAllAsRead}
                className="bg-gradient-to-r bg-clip-text text-transparent from-purple-600 to bg-pink-500 hover:text-blue-800 font-medium transition-colors"
              >
                Mark all as read
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <ClientNotificationSidebar
            categories={categories}
            filter={filter}
            setFilter={setFilter}
          />

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl shadow-lg">
              {/* Search and Actions */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {selectedNotifications.size > 0 && (
                    <button
                      onClick={deleteSelected}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <Trash2 size={16} />
                      Delete Selected ({selectedNotifications.size})
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <ClientNotificationList
                filteredNotifications={filteredNotifications}
                searchTerm={searchTerm}
                selectedNotifications={selectedNotifications}
                getNotificationIcon={getNotificationIcon}
                getNotificationBorder={getNotificationBorder}
                toggleSelectNotification={toggleSelectNotification}
                markAsRead={markAsRead}
                markAsUnread={markAsUnread}
                deleteNotification={deleteNotification}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMainn;
