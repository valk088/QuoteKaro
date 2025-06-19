import React, { useState } from 'react';
import { Bell, Check, X, AlertCircle, Info, CheckCircle, AlertTriangle, Settings, Filter, Search, MoreVertical, Trash2, CheckCheck } from 'lucide-react';
const NotificationMainn = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'success',
      title: 'Payment Successful',
      message: 'Your subscription has been renewed successfully for another month.',
      time: '2 minutes ago',
      read: false,
      category: 'billing'
    },
    {
      id: 2,
      type: 'info',
      title: 'New Feature Available',
      message: 'Dark mode is now available in settings. Try it out!',
      time: '1 hour ago',
      read: false,
      category: 'updates'
    },
    {
      id: 3,
      type: 'warning',
      title: 'Storage Almost Full',
      message: 'You are using 85% of your storage quota. Consider upgrading your plan.',
      time: '3 hours ago',
      read: true,
      category: 'system'
    },
    {
      id: 4,
      type: 'error',
      title: 'Login Attempt Failed',
      message: 'Someone tried to access your account from an unrecognized device.',
      time: '5 hours ago',
      read: false,
      category: 'security'
    },
    {
      id: 5,
      type: 'info',
      title: 'Weekly Report Ready',
      message: 'Your weekly activity report is ready for download.',
      time: '1 day ago', 
      read: true,
      category: 'reports'
    },
    {
      id: 6,
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile information has been successfully updated.',
      time: '2 days ago',
      read: true,
      category: 'account'
    },
    {
      id: 7,
      type: 'warning',
      title: 'API Rate Limit Warning',
      message: 'You have used 90% of your monthly API quota.',
      time: '3 days ago',
      read: false,
      category: 'system'
    },
    {
      id: 8,
      type: 'info',
      title: 'Maintenance Scheduled',
      message: 'System maintenance is scheduled for tomorrow at 2:00 AM UTC.',
      time: '1 week ago',
      read: true,
      category: 'updates'
    }
  ]);

  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNotifications, setSelectedNotifications] = useState(new Set());

  const categories = [
    { id: 'all', label: 'All', count: notifications.length },
    { id: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'billing', label: 'Billing', count: notifications.filter(n => n.category === 'billing').length },
    { id: 'security', label: 'Security', count: notifications.filter(n => n.category === 'security').length },
    { id: 'updates', label: 'Updates', count: notifications.filter(n => n.category === 'updates').length },
    { id: 'system', label: 'System', count: notifications.filter(n => n.category === 'system').length },
    { id: 'reports', label: 'Reports', count: notifications.filter(n => n.category === 'reports').length },
    { id: 'account', label: 'Account', count: notifications.filter(n => n.category === 'account').length }
  ];

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle className="text-green-500" size={20} />;
      case 'error': return <AlertCircle className="text-red-500" size={20} />;
      case 'warning': return <AlertTriangle className="text-yellow-500" size={20} />;
      case 'info': return <Info className="text-blue-500" size={20} />;
      default: return <Bell className="text-gray-500" size={20} />;
    }
  };

  const getNotificationBorder = (type) => {
    switch(type) {
      case 'success': return 'border-l-green-500';
      case 'error': return 'border-l-red-500';
      case 'warning': return 'border-l-yellow-500';
      case 'info': return 'border-l-blue-500';
      default: return 'border-l-gray-500';
    }
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'unread') return !notification.read && matchesSearch;
    return notification.category === filter && matchesSearch;
  });

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAsUnread = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: false } : notification
      )
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
    setSelectedNotifications(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notification => ({ ...notification, read: true })));
  };

  const deleteSelected = () => {
    setNotifications(prev => prev.filter(notification => !selectedNotifications.has(notification.id)));
    setSelectedNotifications(new Set());
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

  const unreadCount = notifications.filter(n => !n.read).length;

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

        <div className=" grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Filter size={20} className="text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-800">Filter</h2>
              </div>
              
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilter(category.id)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-300 ${
                      filter === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <span className="capitalize">{category.label}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      filter === category.id
                        ? 'bg-white/20 text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all duration-300">
                  <Settings size={20} />
                  Notification Settings
                </button>
              </div>
            </div>
          </div>

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
              <div className="divide-y divide-gray-200">
                {filteredNotifications.length === 0 ? (
                  <div className="p-12 text-center">
                    <Bell className="mx-auto mb-4 text-gray-400" size={48} />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No notifications found</h3>
                    <p className="text-gray-600">
                      {searchTerm ? 'Try adjusting your search terms' : 'You\'re all caught up!'}
                    </p>
                  </div>
                ) : (
                  filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-6 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50/50' : ''
                      } border-l-4 ${getNotificationBorder(notification.type)}`}
                    >
                      <div className="flex items-start gap-4">
                        <input
                          type="checkbox"
                          checked={selectedNotifications.has(notification.id)}
                          onChange={() => toggleSelectNotification(notification.id)}
                          className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                        />
                        
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className={`text-lg font-semibold ${
                                  !notification.read ? 'text-gray-900' : 'text-gray-700'
                                }`}>
                                  {notification.title}
                                </h3>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <p className="text-gray-600 mb-2">{notification.message}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{notification.time}</span>
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs capitalize">
                                  {notification.category}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              {!notification.read ? (
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                                  title="Mark as read"
                                >
                                  <Check size={16} />
                                </button>
                              ) : (
                                <button
                                  onClick={() => markAsUnread(notification.id)}
                                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                                  title="Mark as unread"
                                >
                                  <CheckCheck size={16} />
                                </button>
                              )}
                              
                              <button
                                onClick={() => deleteNotification(notification.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                                title="Delete notification"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationMainn;