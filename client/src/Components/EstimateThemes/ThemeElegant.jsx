// ThemeModern.jsx
import React from "react";
import {
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail,
  User,
  FileText,
  Clock,
  CheckCircle,
  Tag,
  TrendingUp,
  DollarSign,
  Camera, // Import Camera icon for the modern theme
} from "lucide-react";

const ThemeElegant = ({ estimate, studio }) => {
  // --- Data Initialization and Fallbacks ---
  const data = estimate || {};
  const studioData = studio || {};

  // Default values for common fields if they are missing
  const defaultEstimate = {
    _id: "0098773",
    clientName: "Susan Foster & David Chung",
    functionName: "Wedding Services",
    subFunction: "Photography",
    location: "1234 Elm Street, Springfield, IL 62704",
    phoneNumber: "+91 98765 43210",
    startDate: new Date("2030/01/30"),
    services: [
      { serviceName: "Pre-Wedding Consultation", description: "", total: 0, included: true },
      { serviceName: "Wedding Day Photography (8 hours)", description: "", total: 1500 },
      { serviceName: "Additional Hourly Coverage", description: "2 hrs", total: 400, rate: 200 },
      { serviceName: "Engagement Session", description: "", total: 300 },
      { serviceName: "High-Resolution Digital Photos", description: "", total: 0, included: true },
      { serviceName: "Online Gallery for Sharing", description: "", total: 0, included: true },
      { serviceName: "Custom Wedding Photo Album", description: "", total: 500 },
      { serviceName: "Travel Fee (if applicable)", description: "", total: 100 }
    ],
    subtotal: 2800,
    discount: 200,
    netTotal: 2600,
    notes: [],
    terms: [
      "Deposit: 50% of the total estimate due at the time of booking.",
      "Balance: Remaining balance due 2 weeks before the wedding date.",
      "Rescheduling must be communicated at least 2 weeks in advance",
      "All raw files and copyrights remain with the studio",
      "Delivery timeline: 4-6 weeks after the event"
    ]
  };

  // Merge provided data with defaults
  const estimateData = { ...defaultEstimate, ...data };

  const formatDate = (dateInput) => {
    if (!dateInput) return 'N/A';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-US', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const formatCurrency = (amount, included = false) => {
    if (included) return "Included";
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  return (
    <div className="max-w-4xl mx-auto bg-[#F5F2F0] font-['Arial'] text-gray-800">
      {/* Header */}
      <div className="bg-[#4A3F43] text-white p-8">
        <h1 className="text-5xl font-light mb-6">ESTIMATE</h1>
        <div className="border-b border-white/20 pb-2 mb-6">
          <h2 className="text-xl font-light mb-1">{estimateData.functionName}</h2>
          <h3 className="text-lg font-light opacity-90">{estimateData.subFunction}</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <div className="text-sm opacity-80">Date Information</div>
            <div>{formatDate(estimateData.startDate)}</div>
          </div>
          <div className="space-y-1">
            <div className="text-sm opacity-80">Estimate Number</div>
            <div>{estimateData._id}</div>
          </div>
        </div>
      </div>

      {/* Client Information */}
      <div className="p-8">
        <div className="mb-8">
          <div className="text-sm text-gray-600 mb-2">Estimate to:</div>
          <div className="text-lg font-medium mb-1">{estimateData.clientName}</div>
          <div className="text-gray-600">{estimateData.location}</div>
          {estimateData.phoneNumber && (
            <div className="text-gray-600 mt-1">
              <Phone className="w-4 h-4 inline-block mr-1" />
              {estimateData.phoneNumber}
            </div>
          )}
        </div>

        {/* Services Table */}
        <div className="mb-8 overflow-hidden rounded-sm">
          <table className="w-full">
            <thead>
              <tr className="bg-[#4A3F43] text-white">
                <th className="text-left py-3 px-4 font-normal">Description</th>
                <th className="text-center py-3 px-4 font-normal">QTY</th>
                <th className="text-right py-3 px-4 font-normal">Unit Price</th>
                <th className="text-right py-3 px-4 font-normal">Total Price</th>
              </tr>
            </thead>
            <tbody>
              {estimateData.services.map((service, index) => (
                <tr key={index} className="bg-[#E6E6E6] even:bg-[#F2F2F2] border-b border-gray-300">
                  <td className="py-3 px-4">{service.serviceName}</td>
                  <td className="text-center py-3 px-4">
                    {service.description || "1"}
                  </td>
                  <td className="text-right py-3 px-4">
                    {service.rate ? `$${service.rate}/hr` : (service.included ? "Included" : "")}
                  </td>
                  <td className="text-right py-3 px-4">
                    {formatCurrency(service.total, service.included)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="bg-[#4A3F43] text-white py-3 px-4">
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="text-sm">Subtotal</div>
              <div className="text-right">{formatCurrency(estimateData.subtotal)}</div>
              {estimateData.discount > 0 && (
                <>
                  <div className="text-sm">Discount</div>
                  <div className="text-right text-green-300">-{formatCurrency(estimateData.discount)}</div>
                </>
              )}
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-white/20">
              <div className="font-medium">TOTAL ESTIMATE</div>
              <div className="font-medium">{formatCurrency(estimateData.netTotal)}</div>
            </div>
          </div>
        </div>

        {/* Terms and Conditions */}
        <div className="mb-8">
          <h4 className="font-bold mb-3">Terms and Conditions:</h4>
          <ul className="list-disc list-inside text-sm text-gray-600 space-y-2">
            {estimateData.terms.map((term, index) => (
              <li key={index}>{term}</li>
            ))}
          </ul>
        </div>

        {/* Signature */}
        <div className="mt-12">
          <div className="border-t border-gray-400 w-48">
            <div className="text-sm text-gray-600 mt-2">THANK YOU FOR YOUR BUSINESS!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeElegant;