import {
  Plus,
  Trash2,
  Calendar,
  MapPin,
  FileText,
  Calculator,
  Percent,
  Save,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
} from "lucide-react";
import { useEffect, useState, React, useMemo } from "react";
import axios from "axios";

import WelcomeSection from "./WelcomeSection";
import { useUser } from "../context/UserContext";
import { useEstimates } from "../context/EstimateContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const EditEstimateMainn = () => {
  const { id } = useParams();
  const { estimates, refreshEstimates } = useEstimates();
  const { userData, loading, refresh } = useUser();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    status:"",
    clientName: "",
    functionName: "",
    phoneNumber: "",
    location: "",
    description: "",
    startDate: "",
    endDate: "",
    notes: "",
  });

  const [services, setServices] = useState([
    { id: 1, serviceName: "", quantity: 1, pricePerUnit: 0, total: 0 },
  ]);

  const [totals, setTotals] = useState({
    subtotal: 0,
    discount: 0,
    discountType: "percentage", // 'percentage' or 'amount'
    netTotal: 0,
  });

  // Use user's custom services for options
    const userServicesOptions = useMemo(() => {
      const services = userData?.services?.map((s) => ({
        name: s.name,
        price: s.price,
      })) || [];
      return services.sort((a, b) => a.name.localeCompare(b.name));
    }, [userData]);
  

  const statusOptions = [
    { value: "draft", label: "Draft", icon: AlertCircle, color: "text-gray-600" },
    { value: "sent", label: "Sent", icon: Clock, color: "text-blue-600" },
    { value: "approved", label: "Approved", icon: CheckCircle, color: "text-green-600" },
    { value: "rejected", label: "Rejected", icon: XCircle, color: "text-red-600" },
  ];

  const estimateToEdit = useMemo(() => {
    return estimates.find((e) => e._id === id);
  }, [estimates, id]);

  useEffect(() => {
    if (estimateToEdit && userData) {
      setFormData({
        status: estimateToEdit.status || "draft",
        clientName: estimateToEdit.clientName || "",
        functionName: estimateToEdit.functionName || "",
        phoneNumber: estimateToEdit.phoneNumber || "",
        location: estimateToEdit.location || "",
        description: estimateToEdit.description || "",
        startDate: estimateToEdit.startDate || "",
        endDate: estimateToEdit.endDate || "",
        notes: estimateToEdit.notes || userData.notes || "",
      });

      const estimateServices = estimateToEdit.services || [];
      if (estimateServices.length > 0) {
        setServices(
          estimateServices.map((service, index) => ({
            ...service,
            id: service.id || index + 1, // Ensure each service has an ID
          }))
        );
      } else {
        setServices([
          { id: 1, serviceName: "", quantity: 1, pricePerUnit: 0, total: 0 },
        ]);
      }

      setTotals({
        subtotal: estimateToEdit.subtotal || 0,
        discount: estimateToEdit.discount || 0,
        discountType: estimateToEdit.discountType || "percentage",
        netTotal: estimateToEdit.netTotal || 0,
      });
    }
  }, [estimateToEdit, userData]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleServiceChange = (id, field, value) => {
    setServices((prev) =>
      prev.map((service) => {
        if (service.id === id) {
          const updated = { ...service };

          if (field === "serviceName") {
            if (value === "custom_input") {
              // User selected 'Write new service'
              updated.serviceName = ""; // Clear current name
              updated.isCustomInput = true;
              updated.pricePerUnit = 0; // Reset price for new custom service
            } else {
              // User selected a predefined service or typed in a custom name
              const selectedOption = userServicesOptions.find(
                (option) => option.name === value
              );

              updated.serviceName = value; // Set the service name to the selected/typed value
              updated.isCustomInput = false; // It's no longer a 'custom_input' state

              if (selectedOption) {
                updated.pricePerUnit = selectedOption.price;
              } else if (value === "") {
                // If user selected empty option
                updated.pricePerUnit = 0;
              }
              // If value is a new custom name typed directly into the input, pricePerUnit remains as is or 0
            }
          } else {
            // For quantity or pricePerUnit changes
            updated[field] = value;
          }

          // Recalculate total for quantity, pricePerUnit, or when serviceName causes price change
          updated.total = updated.quantity * updated.pricePerUnit;
          return updated;
        }
        return service;
      })
    );
  };

  const addService = () => {
    const newId = services.length > 0 ? Math.max(...services.map((s) => s.id)) + 1 : 1;
    setServices((prev) => [
      ...prev,
      {
        id: newId,
        serviceName: "",
        quantity: 1,
        pricePerUnit: 0,
        total: 0,
        isCustomInput: false, // Initialize as not a custom input
      },
    ]);
  };

  const removeService = (id) => {
    if (services.length > 1) {
      setServices((prev) => prev.filter((service) => service.id !== id));
    }
  };

  // Fix calculateTotals function - remove the separate call, let useEffect handle it
  const calculateTotals = () => {
    const subtotal = services.reduce(
      (sum, service) => sum + (Number(service.total) || 0),
      0
    );
    let discountAmount = 0;

    if (totals.discountType === "percentage") {
      discountAmount = (subtotal * Number(totals.discount)) / 100;
    } else {
      discountAmount = Number(totals.discount) || 0;
    }

    const netTotal = Math.max(0, subtotal - discountAmount);

    setTotals((prev) => ({
      ...prev,
      subtotal,
      netTotal: netTotal,
    }));
  };

  const handleDiscountChange = (field, value) => {
    setTotals((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Fix useEffect dependency array
  useEffect(() => {
    calculateTotals();
  }, [services, totals.discount, totals.discountType]);

  const getStatusBadge = (status) => {
    const statusOption = statusOptions.find((option) => option.value === status);
    if (!statusOption) return null;

    const Icon = statusOption.icon;
    return (
      <div className={`flex items-center gap-2 ${statusOption.color}`}>
        <Icon size={16} />
        <span className="font-medium">{statusOption.label}</span>
      </div>
    );
  };

  const handleSubmit = async () => {
    if (isLoading) return; // Prevent double submission

    setIsLoading(true);

    try {
      const isExpired = new Date(userData.planExpiresAt) < new Date();
      if (isExpired) {
        toast.error("🚫 Your plan has expired. Please upgrade to continue.");

        setTimeout(() => {
          navigate("/plan-credits");
        }, 2000);
        return;
      }
      const firebaseUID = localStorage.getItem("firebaseUID");

      // check required credits at least 0.5
      if (userData.left_credits <= 0  ) {
        toast.error(" You're out of credits. Please upgrade to continue.");
        setTimeout(() => {
          navigate("/plan-credits");
        }, 2000);
        return;
      }
      if (userData.isSuspended ) {
        toast.error(" You're account is Suspended");
        setTimeout(() => {
          navigate("/plan-credits");
        }, 2000);
        return;
      }
      if (!firebaseUID) {
        toast.error("Authentication error. Please log in again.");
        setIsLoading(false);
        return;
      }

      // Required field validation
      const requiredFields = [
        formData.clientName,
        formData.functionName,
        formData.phoneNumber,
        formData.startDate,
      ];

      if (requiredFields.some((field) => !field || field.trim() === "")) {
        toast.error("Please fill all required fields marked with *");
        setIsLoading(false);
        return;
      }

      // Validate services
      const validServices = services.filter(
        (service) => service.serviceName && service.serviceName.trim() !== ""
      );

      if (validServices.length === 0) {
        toast.error("Please add at least one service");
        setIsLoading(false);
        return;
      }

      const payload = {
        firebaseUID,
        ...formData,
        services: validServices,
        subtotal: totals.subtotal,
        discount: totals.discount,
        discountType: totals.discountType,
        netTotal: totals.netTotal,
        date: new Date().toISOString(),
      };

      const res = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/estimate/edit/${id}`,
        payload
      );

      if (res.data.success) {
        toast.success("Estimate updated successfully ✅");
        console.log("✅ Estimate updated successfully");
        await refresh();

        // Refresh estimates if function is available
        if (refreshEstimates) {
          await refreshEstimates();
        }

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Failed to update estimate");
      }
    } catch (err) {
      console.error("❌ Failed to update estimate", err);
      toast.error(" Failed to update estimate");
    } finally {
      setIsLoading(false);
    }
  };

  if (loading || !estimates) return <div>Loading...</div>;
  if (!estimateToEdit) return <div>Estimate not found</div>;
  
  return (
    <div className="flex-1 p-0 m-0 md:p-8 overflow-y-auto">
      {/* Header with Status Dropdown */}
      <div className="flex-col justify-between items-center mb-6">
        <WelcomeSection name="Edit-Estimate" />
        
        
      </div>

      <div className="max-w-7xl mx-auto p-3 md:p-6 space-y-6">
        {/* Status Dropdown in Top Right */}
        <div className="bg-white rounded-2xl p-4 shadow-lg border w-fit border-purple-100">
          <div className="flex items-center gap-3 ">
            <span className="text-sm font-semibold text-gray-700">Status:</span>
            <select
              value={formData.status}
              onChange={(e) => handleInputChange("status", e.target.value)}
              className="p-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all font-medium"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <div className="ml-2">
              {getStatusBadge(formData.status)}
            </div>
          </div>
        </div>
        {/* Client Information Card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Client Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Client Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Client Name *
              </label>
              <input
                type="text"
                value={formData.clientName}
                onChange={(e) =>
                  handleInputChange("clientName", e.target.value)
                }
                placeholder="Enter client name"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Function Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Function Name *
              </label>
              <input
                type="text"
                value={formData.functionName}
                onChange={(e) =>
                  handleInputChange("functionName", e.target.value)
                }
                placeholder="e.g., Wedding, Birthday Party"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Start Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Start Date *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  value={
                    formData.startDate ? formData.startDate.slice(0, 10) : ""
                  }
                  onChange={(e) =>
                    handleInputChange("startDate", e.target.value)
                  }
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                End Date (Optional)
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  value={formData.endDate ? formData.endDate.slice(0, 10) : ""}
                  onChange={(e) => handleInputChange("endDate", e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Location
              </label>
              <div className="relative">
                <MapPin
                  className="absolute left-4 top-4 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) =>
                    handleInputChange("location", e.target.value)
                  }
                  placeholder="Event location"
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="text"
                value={formData.phoneNumber}
                onChange={(e) =>
                  handleInputChange("phoneNumber", e.target.value)
                }
                placeholder="e.g. +91 784xxxxxxx"
                className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Services Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center">
                <Calculator size={20} className="text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Services</h2>
            </div>
            <button
              onClick={addService}
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-2 rounded-xl font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
            >
              <Plus size={18} />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-gradient-to-r from-gray-50 to-purple-50/30 p-4 rounded-2xl border border-gray-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Service Name
                    </label>
                    <select
                      value={service.serviceName}
                      onChange={(e) =>
                        handleServiceChange(
                          service.id,
                          "serviceName",
                          e.target.value
                        )
                      }
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select a service</option>
                          <option value="custom_input" className="font-bold text-purple-700 bg-purple-50">
                            --- Write new service ---
                          </option>
                          {userServicesOptions.map((option) => (
                            <option key={option.name} value={option.name}>
                              {option.name} {option.price > 0 ? `(₹${option.price.toLocaleString()})` : ''}
                            </option>
                          ))}
                        </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Quantity
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={service.quantity}
                      onChange={(e) =>
                        handleServiceChange(
                          service.id,
                          "quantity",
                          parseInt(e.target.value) || 1
                        )
                      }
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Price per Unit
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={service.pricePerUnit}
                      onChange={(e) =>
                        handleServiceChange(
                          service.id,
                          "pricePerUnit",
                          parseFloat(e.target.value) || 0
                        )
                      }
                      className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Total
                      </label>
                      <div className="w-full p-3 bg-purple-50 border border-purple-200 rounded-xl font-bold text-purple-600">
                        ₹{service.total.toLocaleString()}
                      </div>
                    </div>
                    {services.length > 1 && (
                      <button
                        onClick={() => removeService(service.id)}
                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Totals Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <Percent size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Total Calculation
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-gray-700 font-medium">Subtotal</span>
              <span className="text-xl font-bold text-gray-900">
                ₹{totals.subtotal.toLocaleString()}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Type
                </label>
                <select
                  value={totals.discountType}
                  onChange={(e) =>
                    handleDiscountChange("discountType", e.target.value)
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                >
                  <option value="percentage">Percentage (%)</option>
                  <option value="amount">Fixed Amount (₹)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount{" "}
                  {totals.discountType === "percentage" ? "(%)" : "(₹)"}
                </label>
                <input
                  type="number"
                  min="0"
                  max={
                    totals.discountType === "percentage" ? 100 : totals.subtotal
                  }
                  value={totals.discount}
                  onChange={(e) =>
                    handleDiscountChange(
                      "discount",
                      parseFloat(e.target.value) || 0
                    )
                  }
                  className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Discount Amount
                </label>
                <div className="w-full p-3 bg-red-50 border border-red-200 rounded-xl font-bold text-red-600">
                  -₹
                  {(totals.discountType === "percentage"
                    ? (totals.subtotal * totals.discount) / 100
                    : totals.discount
                  ).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center py-4 border-t-2 border-purple-200 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl px-4">
              <span className="text-xl font-bold text-purple-900">
                Net Total
              </span>
              <span className="text-2xl  bg-gradient-to-r font-bold from-purple-600 to-pink-600 bg-clip-text text-transparent">
                ₹{totals.netTotal.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-purple-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <FileText size={20} className="text-white" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">
              Additional Notes
            </h2>
          </div>

          <textarea
            value={formData.notes}
            onChange={(e) => handleInputChange("notes", e.target.value)}
            placeholder="Add any special terms, conditions, or additional information..."
            rows={4}
            className="w-full p-4 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r hover:from-pink-600 hover:to-purple-600 hover:scale-105  text-white py-4 px-6 rounded-2xl font-bold hover:bg-gradient-to-r from-purple-600  hover: from-pink-600 to-pink-600  transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={20} />
            {isLoading ? "Updating..." : "Update Estimate"}
          </button>
          <button className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-700 hover:scale-105 text-white py-4 px-6 rounded-2xl font-bold hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3">
            <Send size={20} />
            Send Estimate
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditEstimateMainn;