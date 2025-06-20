import { useState } from "react";
import WelcomeSection from "./WelcomeSection";
import {
  Search,
  Plus,
  Eye,
  Edit2,
  Send,
  Download,
  Trash2,
  X,
  Check,
  Clock,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEstimates } from "../context/EstimateContext";
import { Link } from "react-router-dom";
function MyEstimatesMainn() {
  const { estimates, loading ,deleteEstimate} = useEstimates();

  

  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  if (loading || !estimates) return null;

  
  const statusConfig = {
    sent: {
      icon: Check,
      color: "text-emerald-500",
      bg: "bg-emerald-50",
      label: "Sent",
    },
    draft: {
      icon: Edit2,
      color: "text-blue-500",
      bg: "bg-blue-50",
      label: "Draft",
    },
    pending: {
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-50",
      label: "Pending",
    },
    rejected: {
      icon: X,
      color: "text-red-500",
      bg: "bg-red-50",
      label: "Rejected",
    },
  };

  

  const EstimateCard = ({ estimate }) => {
    const navigate = useNavigate(); 

    const actions = [
    {
      label: "Edit",
      icon: Edit2,
      color: "yellow",
      onClick: () => navigate(`/edit-estimate/${estimate._id}`)
    },
    {
      label: "Send",
      icon: Send,
      color: "green",
      onClick: () => console.log("Send"),
    },
    {
      label: "PDF",
      icon: Download,
      color: "orange",
      onClick: () => console.log("Download"),
    },
    {
      label: "Delete",
      icon: Trash2,
      color: "red",
      onClick: () => {if (confirm("Are you sure you want to delete this estimate?"))  deleteEstimate(estimate._id);
              }
    },
    {
      label: "View",
      icon: Eye,
      color: "blue",
      onClick: () => navigate(`/preview/${estimate._id}`)
    },
  ];
    return (
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-md border border-gray-200 hover:shadow-lg transition-all duration-200 space-y-4">
        {/* Header */}
        <div className="flex flex-row justify-between sm:flex-row bg-white sm:justify-between sm:items-start">
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-black">
              {estimate.clientName}
            </h3>
            <p className="text-sm font-semibold md:py-2 text-gray-700">
              {estimate.functionName}
            </p>
            <div className="text-sm  font-semibold text-gray-700">
              {new Date(estimate.startDate).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </div>
          </div>

          <div className="sm:m-0 flex-col m-3   ">
            <div className="text-xl mb-1 font-bold  bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              ₹{estimate.subtotal}
            </div>
            <StatusBadge status={estimate.status} />
          </div>
        </div>

        {/* Action Buttons - Responsive */}
        <div className="flex flex-wrap md:flex justify-start sm:justify-between gap-2 sm:gap-3">
          {actions.map(({ label, icon: Icon, color, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className={`flex-1 sm:flex-auto flex items-center justify-center gap-2 py-2 px-3 bg-${color}-50 text-${color}-600 rounded-xl font-medium hover:bg-${color}-100 transition-colors`}
              title={label}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const EmptyState = () => (
    <div className="text-center py-16">
      <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <AlertCircle size={32} className="text-purple-400" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        No estimates found
      </h3>
      <p className="text-gray-600 mb-6">
        {searchTerm || activeFilter !== "all"
          ? "Try adjusting your search or filters"
          : "Create your first estimate to get started"}
      </p>
      {!searchTerm && activeFilter === "all" && (
        <Link to="/new-estimate" t className="bg-purple-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-purple-700 transition-colors">
          Create Estimate
        </Link>
      )}
    </div>
  );

  const filteredEstimates = estimates.filter((estimate) => {
    const matchesSearch =
      estimate.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      estimate.functionName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === "all" || estimate.status === activeFilter;
    return matchesSearch && matchesFilter;
  });
  const StatusBadge = ({ status }) => {
    const config = statusConfig[status];
    const Icon = config.icon;
    return (
      <div
        className={`inline-flex  items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${config.color} ${config.bg}`}
      >
        <Icon size={12} />
        {config.label}
      </div>
    );
  };

  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <WelcomeSection name="MyEstimates" />

      {/* Main */}
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-4 py-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">My Estimates</h1>
              <Link to="/new-estimate" className="bg-purple-600 text-white p-3 rounded-xl hover:bg-purple-700 transition-colors shadow-lg">
                <Plus size={20} />
              </Link>
            </div>

            {/* Search */}
            <div className="relative mb-4">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search estimates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-0 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {[
                { key: "all", label: "All", count: estimates.length },
                {
                  key: "sent",
                  label: "Sent",
                  count: estimates.filter((e) => e.status === "sent").length,
                },
                {
                  key: "draft",
                  label: "Draft",
                  count: estimates.filter((e) => e.status === "draft").length,
                },
                {
                  key: "pending",
                  label: "Pending",
                  count: estimates.filter((e) => e.status === "pending").length,
                },
              ].map((filter) => (
                <button
                  key={filter.key}
                  onClick={() => setActiveFilter(filter.key)}
                  className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${
                    activeFilter === filter.key
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {filter.label}{" "}
                  {filter.count > 0 && (
                    <span
                      className={`ml-1.5 px-1.5 py-0.5 rounded-full text-xs ${
                        activeFilter === filter.key
                          ? "bg-white/20"
                          : "bg-gray-300"
                      }`}
                    >
                      {filter.count}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 py-6">
          {filteredEstimates.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {filteredEstimates.map((estimate) => (
                <EstimateCard key={estimate._id} estimate={estimate} />
              ))}
            </div>
          )}
        </div>

        {/* Floating Action Button for Mobile */}
        <Link to="/new-estimate" className="fixed bottom-6 right-6 bg-purple-600 text-white p-4 rounded-full shadow-2xl hover:bg-purple-700 transition-all hover:scale-110 md:hidden">
          <Plus size={24} />
        </Link>
      </div>
    </div>
  );
}

export default MyEstimatesMainn;
