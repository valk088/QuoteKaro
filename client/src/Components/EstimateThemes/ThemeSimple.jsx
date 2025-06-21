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

const ThemeSimple = ({ estimate, studio }) => {
  // --- Data Initialization and Fallbacks (same as Elegant for consistency) ---
  const data = estimate || {
    _id: "EST001",
    clientName: "Sarah Johnson",
    functionName: "Wedding Reception",
    location: "Grand Ballroom, The Plaza Hotel",
    phoneNumber: "+1 (555) 123-4567",
    description: "This comprehensive estimate covers all aspects of the wedding reception, including premium photography, full-service catering for 100 guests, bespoke floral arrangements, a live music band for entertainment, and elegant venue decoration to match the couple's theme. Special attention has been given to sustainable sourcing for flowers and a diverse menu with vegetarian and vegan options.",
    notes: "Client requested a follow-up call by end of next week to discuss final menu selections and seating arrangements. Vegetarian and gluten-free options are highlighted in the catering service details. Please confirm final guest count 14 days prior to the event.",
    startDate: new Date("2024-12-15T18:00:00"),
    endDate: new Date("2024-12-16T01:00:00"),
    services: [
      { serviceName: "Premium Wedding Photography Package (Full Day)", quantity: 1, pricePerUnit: 350000, total: 350000 },
      { serviceName: "Catering Service (100 Guests, Deluxe Menu)", quantity: 100, pricePerUnit: 4500, total: 450000 },
      { serviceName: "Bespoke Floral Arrangements & Centerpieces", quantity: 1, pricePerUnit: 120000, total: 120000 },
      { serviceName: "Live Jazz Band (5-piece, 4 hours)", quantity: 1, pricePerUnit: 180000, total: 180000 },
      { serviceName: "Venue Draping & Lighting Design", quantity: 1, pricePerUnit: 95000, total: 95000 },
      { serviceName: "Event Coordinator On-Site (2 Days)", quantity: 2, pricePerUnit: 25000, total: 50000 }
    ],
    subtotal: 1245000,
    discount: 45000,
    discountType: "amount",
    netTotal: 1200000,
    status: "sent",
    createdAt: new Date("2024-06-18T14:30:00"),
    validUntil: new Date("2024-07-18T23:59:59")
  };

  const studioData = studio || {
    studioName: "Creative Lens Studio",
    email: "contact@creativelens.com",
    phone: "+91 78901 23456",
    address: {
      d_address: "Flat 4B, Sunshine Apartments",
      city: "Jaipur",
      state: "Rajasthan",
      pincode: "302001",
      country: "India"
    },
    website: "www.creativelens.com",
    caption: "Capturing moments, crafting memories.",
    logoUrl: "https://via.placeholder.com/150x50.png?text=CAMERA+LOGO", // Placeholder for a modern logo
    policies: [
      "A 50% deposit is required upon booking confirmation.",
      "Remaining balance is due 7 days prior to the event date.",
      "Cancellations made less than 30 days before the event will incur a 25% charge.",
      "All quoted prices are inclusive of GST.",
      "Any scope changes or additions must be agreed upon in writing.",
    ],
  };

  // --- Helper Functions (same as Elegant) ---
  const getFullAddress = (address) => {
    if (!address) return 'Address not available';
    const parts = [address.d_address, address.city, address.state, address.pincode, address.country].filter(Boolean);
    return parts.join(', ');
  };
  const fullAddress = getFullAddress(studioData.address);
  const formatDate = (dateInput) => {
    if (!dateInput) return 'N/A';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
  };
  const formatDateTime = (dateInput) => {
    if (!dateInput) return 'N/A';
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true });
  };
  const getStatusClasses = (status) => {
    const statusMap = {
      draft: 'bg-gray-100 text-gray-700',
      sent: 'bg-blue-100 text-blue-700',
      viewed: 'bg-purple-100 text-purple-700',
      accepted: 'bg-green-100 text-green-700',
      rejected: 'bg-red-100 text-red-700',
    };
    return statusMap[status] || statusMap.draft;
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 2 }).format(amount || 0);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white font-sans text-gray-800 relative overflow-hidden rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
      {/* Background Camera Icon (Aesthetic touch) */}
      <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 text-gray-100 opacity-50 -rotate-12 pointer-events-none z-0" />

      {/* Header Section: Studio Info (left) & Estimate Tag (right) - Light Blue/Green Gradient */}
      <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 p-6 bg-gradient-to-br from-blue-50 to-green-50 rounded-lg border border-gray-100 shadow-sm">
        <div className="mb-6 sm:mb-0">
          {studioData.logoUrl && (
            <img src={studioData.logoUrl} alt={`${studioData.studioName} Logo`} className="h-12 w-auto mb-3" />
          )}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-1">{studioData.studioName || "Your Studio Name"}</h1>
          <p className="text-gray-600 text-sm sm:text-base">{studioData.caption || "Crafting Beautiful Experiences"}</p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-gray-500 text-sm mb-1">Estimate For:</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">{data.clientName || "Client Name"}</h2>
          <p className="text-lg sm:text-xl font-semibold text-gray-700">#{data._id?.slice(-4)?.toUpperCase() || '0000'}</p>
          <div className={`mt-3 inline-flex items-center px-3 py-1 text-xs sm:text-sm font-medium rounded-full ${getStatusClasses(data.status)}`}>
            <CheckCircle className="w-3 h-3 mr-1.5" />
            {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </div>
        </div>
      </div>

      {/* Client & Event Details & Contact Info (Modern Layout) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Client & Event Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Event Details
          </h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Function:</span>
              <span>{data.functionName || 'Special Event'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Location:</span>
              <span>{data.location || 'TBD'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Event Date(s):</span>
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1.5" />
                {formatDateTime(data.startDate)}
                {data.endDate && data.startDate !== data.endDate && ` - ${formatDateTime(data.endDate)}`}
              </span>
            </div>
          </div>
        </div>

        {/* Studio Contact Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <Mail className="w-5 h-5 mr-2 text-green-500" />
            Connect With Us
          </h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>{fullAddress}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2" />
              <span>{studioData.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2" />
              <span>{studioData.email}</span>
            </div>
            {studioData.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <a href={`http://${studioData.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">
                  {studioData.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description & Estimate Date (Side-by-side) */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {data.description && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-500" />
              Estimate Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">{data.description}</p>
          </div>
        )}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <Clock className="w-5 h-5 mr-2 text-indigo-500" />
              Key Dates
            </h3>
            <div className="space-y-2 text-gray-700 text-sm">
              <div className="flex justify-between">
                <span className="font-semibold">Estimate Issued:</span>
                <span>{formatDate(data.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Valid Until:</span>
                <span>{formatDate(data.validUntil || new Date(new Date().setMonth(new Date().getMonth() + 1)))}</span>
              </div>
            </div>
          </div>
          {data.notes && (
            <div className="mt-6 border-t border-gray-100 pt-4">
              <h4 className="font-semibold text-gray-800 mb-2 text-base flex items-center">
                <Clock className="w-4 h-4 mr-2 text-gray-500" />
                Special Notes
              </h4>
              <p className="text-gray-600 leading-relaxed text-sm italic">{data.notes}</p>
            </div>
          )}
        </div>
      </div>

      {/* Services Table */}
      <div className="relative z-10 mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Tag className="w-6 h-6 mr-3 text-purple-500" />
          Services Breakdown
        </h3>
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Service Description</th>
                <th scope="col" className="px-6 py-3 text-center text-xs font-bold text-gray-700 uppercase tracking-wider w-24">Qty</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider w-32">Rate</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {data.services && data.services.length > 0 ? (
                data.services.map((service, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{service.serviceName || 'Unnamed Service'}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-700">
                      {service.quantity || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-700">
                      {formatCurrency(service.pricePerUnit)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(service.total)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-8 text-center text-gray-500 text-sm">
                    No services listed for this estimate.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary and Terms (modern layout with subtle dividers) */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
        {/* Estimate Summary */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
            Financial Summary
          </h4>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(data.subtotal)}</span>
            </div>

            {data.discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>
                  Discount {data.discountType === 'percentage' && data.discount !== undefined ? `(${data.discount}%)` : ''}:
                </span>
                <span className="font-semibold">- {formatCurrency(data.discount)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-xl font-extrabold text-gray-900">
                <span>TOTAL ESTIMATE:</span>
                <span className="text-blue-600">{formatCurrency(data.netTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2 text-gray-500" />
            Important Policies
          </h4>
          <p className="text-gray-600 leading-relaxed text-sm">
                {studioData.policies}
              </p>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 text-center mt-10 pt-6 border-t border-gray-100 text-gray-500 text-xs sm:text-sm">
        <p className="mb-2 text-gray-700 font-semibold">Thank you for considering {studioData.studioName || 'Our Studio'}!</p>
        {/* <p>Generated on: {formatDate(new Date())} at {new Date().toLocaleTimeString('en-IN')}</p> */}
        <p className="mt-1">© {new Date().getFullYear()} {studioData.studioName || 'Your Studio'}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ThemeSimple;