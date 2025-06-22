import React from 'react';
import { Bell, CheckCircle, AlertCircle, AlertTriangle, Info, MoreVertical, Trash2, CheckCheck, X } from 'lucide-react';

const ClientNotificationList = ({
  filteredNotifications,
  searchTerm,
  selectedNotifications,
  getNotificationIcon,
  getNotificationBorder,
  toggleSelectNotification,
  markAsRead,
  markAsUnread,
  deleteNotification
}) => {
  return (
    <div className="lg:col-span-3">
      <div className="bg-white rounded-xl shadow-lg">
        {/* Search and Actions - Assuming this part is in the parent or handled externally */}
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
                key={notification._id} // Use _id from MongoDB
                className={`p-6 hover:bg-gray-50 transition-colors ${
                  !notification.read ? 'bg-blue-50/50' : ''
                } border-l-4 ${getNotificationBorder(notification.type)}`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="checkbox"
                    checked={selectedNotifications.has(notification._id)}
                    onChange={() => toggleSelectNotification(notification._id)}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-semibold text-gray-800 text-lg">{notification.title}</h4>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <span>{new Date(notification.createdAt).toLocaleString()}</span> {/* Use createdAt */}
                        {/* Dropdown for More Actions */}
                        <div className="relative group">
                          <MoreVertical size={16} className="cursor-pointer hover:text-gray-700" />
                          <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                            {!notification.read ? (
                              <button
                                onClick={() => markAsRead(notification._id)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-t-lg"
                              >
                                <CheckCheck size={16} /> Mark as Read
                              </button>
                            ) : (
                              <button
                                onClick={() => markAsUnread(notification._id)}
                                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center gap-2 rounded-t-lg"
                              >
                                <X size={16} /> Mark as Unread
                              </button>
                            )}
                            <button
                              onClick={() => deleteNotification(notification._id)}
                              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2 rounded-b-lg"
                            >
                              <Trash2 size={16} /> Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-2">{notification.message}</p>
                    <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                      {notification.category.charAt(0).toUpperCase() + notification.category.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientNotificationList;
