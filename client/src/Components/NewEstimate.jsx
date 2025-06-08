
import React, { useState } from 'react';
import { 
  LayoutGrid, 
  User, 
  MessageSquare, 
  AlertCircle, 
  Settings,
  ChevronRight,
  ChevronLeft,
  Bell,
  Plus,
  Eye,
  Edit,
  Send,
  TrendingUp,
  TrendingDown,
  Calendar,
  CreditCard,
  Palette,
  MessageCircle,
  Copy,
  Share2,
  Phone,
  ExternalLink,
  Crown,
  Zap,
  FileText,
  Users,
  DollarSign,
  Activity
} from 'lucide-react';

function NewEstimate() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { id: 'estimates', icon: FileText, label: 'Estimates' },
    { id: 'clients', icon: Users, label: 'Clients' },
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  // Mock data
  const studioData = {
    name: "Creative Studio Pro",
    credits: 125,
    plan: "Premium",
    profileComplete: false,
    currentTheme: "Modern Purple"
  };

  const quickStats = [
    { title: "Total Estimates", value: "247", change: "+12%", trend: "up", icon: FileText, color: "blue" },
    { title: "Total Clients", value: "89", change: "+8%", trend: "up", icon: Users, color: "green" },
    { title: "Credits Left", value: studioData.credits, change: "-15", trend: "down", icon: Zap, color: "yellow" },
    { title: "This Month", value: "₹2,45,000", change: "+23%", trend: "up", icon: DollarSign, color: "purple" }
  ];

  const recentEstimates = [
    { id: 1, client: "Rahul Sharma", occasion: "Wedding Photography", amount: "₹85,000", date: "2 days ago", status: "sent" },
    { id: 2, client: "Priya Singh", occasion: "Birthday Party", amount: "₹25,000", date: "3 days ago", status: "draft" },
    { id: 3, client: "Amit Kumar", occasion: "Corporate Event", amount: "₹1,20,000", date: "5 days ago", status: "viewed" },
    { id: 4, client: "Sneha Patel", occasion: "Pre-wedding Shoot", amount: "₹45,000", date: "1 week ago", status: "sent" },
    { id: 5, client: "Rohit Gupta", occasion: "Baby Shower", amount: "₹35,000", date: "1 week ago", status: "accepted" }
  ];

  const topClients = [
    { name: "Rahul Sharma", phone: "+91 98765 43210", estimates: 8, lastEstimate: "2 days ago" },
    { name: "Priya Singh", phone: "+91 87654 32109", estimates: 5, lastEstimate: "3 days ago" },
    { name: "Amit Kumar", phone: "+91 76543 21098", estimates: 12, lastEstimate: "5 days ago" },
    { name: "Sneha Patel", phone: "+91 65432 10987", estimates: 3, lastEstimate: "1 week ago" }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'sent': return 'bg-blue-100 text-blue-800';
      case 'viewed': return 'bg-yellow-100 text-yellow-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ stat }) => {
    const Icon = stat.icon;
    const colorClasses = {
      blue: "bg-blue-50 border-blue-100 text-blue-600",
      green: "bg-green-50 border-green-100 text-green-600",
      yellow: "bg-yellow-50 border-yellow-100 text-yellow-600",
      purple: "bg-purple-50 border-purple-100 text-purple-600"
    };

    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colorClasses[stat.color]}`}>
            <Icon size={24} />
          </div>
          <div className={`flex items-center gap-1 text-sm ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {stat.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {stat.change}
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</h3>
        <p className="text-gray-600 text-sm">{stat.title}</p>
      </div>
    );

}
  

  return (
    <div>
      <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {/* Top Bar - Desktop Only */}
          <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                🚀 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"> Dashboard</span>
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {studioData.name}! Here's your studio overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Today</p>
                <p className="font-medium text-gray-800">{new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <button className="relative p-3 bg-white rounded-xl border border-gray-200 text-gray-600 hover:text-gray-800 shadow-sm">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>

          {/* Profile Completion Alert */}
          {!studioData.profileComplete && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 mb-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <AlertCircle size={20} className="text-orange-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-orange-800 mb-1">Complete Your Profile</h3>
                  <p className="text-sm text-orange-700 mb-3">Unlock full features like PDF branding, auto-fill, WhatsApp sharing, and more!</p>
                  <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700 transition-colors">
                    Go to Profile
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {quickStats.map((stat, index) => (
              <StatCard key={index} stat={stat} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Recent Estimates */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">Recent Estimates</h2>
                  <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
                    <Plus size={16} /> Create New
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Client</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Occasion</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Amount</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                        <th className="text-left p-4 text-sm font-medium text-gray-600">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentEstimates.map((estimate) => (
                        <tr key={estimate.id} className="border-b border-gray-50 hover:bg-gray-25">
                          <td className="p-4">
                            <div className="font-medium text-gray-800">{estimate.client}</div>
                          </td>
                          <td className="p-4 text-gray-600">{estimate.occasion}</td>
                          <td className="p-4 font-medium text-gray-800">{estimate.amount}</td>
                          <td className="p-4 text-gray-500 text-sm">{estimate.date}</td>
                          <td className="p-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(estimate.status)}`}>
                              {estimate.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center gap-2">
                              <button className="p-1 text-gray-600 hover:text-blue-600" title="View">
                                <Eye size={16} />
                              </button>
                              <button className="p-1 text-gray-600 hover:text-green-600" title="Edit">
                                <Edit size={16} />
                              </button>
                              <button className="p-1 text-gray-600 hover:text-purple-600" title="Send via WhatsApp">
                                <Send size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Clients */}
              <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-gray-100">
                  <h2 className="text-xl font-semibold text-gray-800">Top Clients</h2>
                  <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">View All</button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {topClients.map((client, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-800">{client.name}</h3>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone size={12} /> {client.phone}
                            </span>
                            <span className="text-sm text-gray-500">{client.estimates} estimates</span>
                            <span className="text-sm text-gray-500">Last: {client.lastEstimate}</span>
                          </div>
                        </div>
                        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                          View Estimates
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Credits & Plan */}
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <Crown size={24} />
                  <div>
                    <h3 className="font-semibold">{studioData.plan} Plan</h3>
                    <p className="text-purple-100 text-sm">Active subscription</p>
                  </div>
                </div>
                <div className="bg-white/20 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-purple-100">Credits Remaining</span>
                    <Zap size={16} />
                  </div>
                  <div className="text-2xl font-bold">{studioData.credits}</div>
                </div>
                <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
                  Buy More Credits
                </button>
              </div>

              {/* Theme Preview */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Palette size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Current Theme</h3>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg p-4 mb-4">
                  <div className="text-white text-sm font-medium">{studioData.currentTheme}</div>
                  <div className="text-purple-100 text-xs mt-1">Premium Template</div>
                </div>
                <button className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                  Change Theme
                </button>
              </div>

              {/* Website Link */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-semibold text-gray-800 mb-3">Your Studio Profile</h3>
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="text-sm text-gray-600 break-all">quotekaro.com/creativestudiopro</div>
                </div>
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                    <Copy size={16} /> Copy
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                    <Share2 size={16} /> Share
                  </button>
                </div>
              </div>

              {/* Feedback */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                <div className="flex items-center gap-3 mb-3">
                  <MessageCircle size={20} className="text-blue-600" />
                  <h3 className="font-semibold text-blue-800">Feedback</h3>
                </div>
                <p className="text-blue-700 text-sm mb-4">Want a new feature? Have suggestions? We'd love to hear from you!</p>
                <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                  Send Feedback
                </button>
              </div>

              {/* Mini Calendar */}
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar size={20} className="text-gray-600" />
                  <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">Wedding Shoot</div>
                      <div className="text-xs text-gray-500">Tomorrow, 10:00 AM</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">Birthday Party</div>
                      <div className="text-xs text-gray-500">Dec 15, 6:00 PM</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default NewEstimate



