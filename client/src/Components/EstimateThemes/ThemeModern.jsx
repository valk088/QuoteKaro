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
  Camera,
  Image,
  BookOpen,
  QrCode,
} from "lucide-react";

const ThemeModern = ({ estimate, studio }) => {
  // --- Data Initialization and Fallbacks ---
  // Use actual props, provide fallbacks for development/missing data
  const data = estimate || {};
  const studioData = studio || {};

  // Default values for common fields if they are missing
  const defaultEstimate = {
    _id: "EST001",
    clientName: "Client Name",
    functionName: "Event Type",
    location: "Location TBD",
    phoneNumber: "N/A",
    description: "This is a comprehensive estimate outlining various services.",
    startDate: new Date(),
    endDate: null,
    services: [
      { serviceName: "Sample Photography Package", description: "Standard coverage for 4 hours", total: 10000 },
      { serviceName: "Basic Photo Album", description: "20-page standard album", total: 5000 },
    ],
    subtotal: 15000,
    discount: 0,
    discountType: "amount",
    netTotal: 15000,
    status: "draft",
    createdAt: new Date(),
    validUntil: new Date(new Date().setMonth(new Date().getMonth() + 1)),
    notes: "Please review the details carefully and contact us for any modifications."
  };

  const defaultStudio = {
    studioName: "Your Creative Studio",
    email: "contact@yourstudio.com",
    phone: "+91 98765 43210",
    address: {
      d_address: "123 Studio Lane",
      city: "Udaipur",
      state: "Rajasthan",
      pincode: "313001",
      country: "India"
    },
    website: "www.yourstudio.com",
    caption: "Capturing your precious moments.",
    logoUrl: "", // Handled by custom SVG
    policies: "All estimates are valid for 30 days. A 25% advance is required to confirm booking. Cancellations within 7 days of the event are non-refundable."
  };

  // Merge provided data with defaults
  const estimateData = { ...defaultEstimate, ...data };
  const currentStudioData = { ...defaultStudio, ...studioData };

  // --- Helper Functions ---
  const getFullAddress = (address) => {
    if (!address) return 'Address not available';
    const parts = [address.d_address, address.city, address.state, address.pincode, address.country].filter(Boolean);
    return parts.join(', ');
  };
  const fullAddress = getFullAddress(currentStudioData.address);

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
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount || 0);
  };

  // Notes can be string or array, ensure it's an array for mapping
  const estimateNotesArray = Array.isArray(estimateData.notes) ? estimateData.notes : (estimateData.notes ? estimateData.notes.split('\n').filter(Boolean) : []);


  // Function to get icon based on service name (simplified for demo)
  const getServiceIcon = (serviceName) => {
    if (serviceName && serviceName.toLowerCase().includes("coverage")) {
      return <Camera size={18} className="inline-block mr-2 text-gray-600" />;
    }
    if (serviceName && serviceName.toLowerCase().includes("engagement")) {
      return <Image size={18} className="inline-block mr-2 text-gray-600" />;
    }
    if (serviceName && serviceName.toLowerCase().includes("album")) {
      return <BookOpen size={18} className="inline-block mr-2 text-gray-600" />;
    }
    return <Tag size={18} className="inline-block mr-2 text-gray-600" />; // Default icon
  };

  return (
    <div className="max-w-4xl mx-auto bg-white font-['Open_Sans'] text-gray-800 p-8 shadow-lg">
      {/* Top Header - Studio Info */}
      <div className="text-center mb-8">
        {/* Custom 'G' Logo SVG (or use currentStudioData.logoUrl if provided) */}
        {currentStudioData.logoUrl ? (
             <img src={currentStudioData.logoUrl} alt={`${currentStudioData.studioName} Logo`} className="h-16 w-auto mx-auto mb-4" />
        ) : (
          <svg className="mx-auto mb-4 w-16 h-16" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" stroke="#D3B89B" strokeWidth="2"/>
            <path d="M57.6 30.8C57.6 28.5 57 26.6 55.7 25.1C54.4 23.6 52.7 22.8 50.7 22.8C48.7 22.8 47 23.6 45.7 25.1C44.4 26.6 43.8 28.5 43.8 30.8H39.8C39.8 27.7 40.7 25 42.6 22.8C44.6 20.6 47.4 19.5 51 19.5C54.7 19.5 57.5 20.6 59.4 22.8C61.3 25 62.3 27.7 62.3 30.8V44.4C62.3 47.6 61.6 50.5 60.2 53.1C58.8 55.7 56.8 57.7 54.3 59.1C51.8 60.5 49.1 61.2 46.2 61.2C43.3 61.2 40.7 60.6 38.3 59.3C36 58 34.2 56.3 32.9 54.2C31.6 52.1 30.9 49.8 30.9 47.3H34.9C34.9 49.4 35.5 51.2 36.8 52.7C38.1 54.2 39.8 55 41.8 55C43.8 55 45.5 54.2 46.8 52.7C48.1 51.2 48.7 49.4 48.7 47.3V38.1H57.6V30.8ZM48.7 63.8C51 63.8 53 64.6 54.6 66.2C56.2 67.8 57 69.8 57 72.2V79.2H53V72.2C53 70.1 52.4 68.3 51.1 66.8C49.8 65.3 48.1 64.5 46.1 64.5C44.1 64.5 42.4 65.3 41.1 66.8C39.8 68.3 39.2 70.1 39.2 72.2V79.2H35.2V72.2C35.2 69.8 35.9 67.8 37.5 66.2C39.1 64.6 41.1 63.8 43.5 63.8H48.7Z" fill="#D3B89B"/>
          </svg>
        )}
        
        <h1 className="text-3xl tracking-widest text-gray-800 uppercase font-light mb-2">
          {currentStudioData.studioName || "Your Studio Name"}
        </h1>
        {currentStudioData.caption && (
          <p className="text-gray-600 text-sm mb-4">{currentStudioData.caption}</p>
        )}
        <div className="border-t border-gray-300 w-full mx-auto"></div>
      </div>

      {/* Main Estimate Title and Client Info */}
      <div className="text-center mb-8">
        <h2 className="text-7xl font-['Dancing_Script'] text-gray-900 mb-6 font-semibold">
          Estimate
        </h2>
        <p className="text-lg text-gray-700 mb-2">Estimate For</p>
        <h3 className="text-3xl font-semibold text-gray-900 mb-2">
          {estimateData.clientName || defaultEstimate.clientName}
        </h3>
        <p className="text-xl text-gray-700">
          {estimateData.functionName || defaultEstimate.functionName}
        </p>
        <div className="border-t border-gray-300 w-full mx-auto mt-6"></div>
      </div>

      {/* Client & Event Details and Studio Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Client & Event Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
            <User className="w-5 h-5 mr-2 text-blue-500" />
            Client & Event Details
          </h3>
          <div className="space-y-3 text-gray-700 text-sm">
            <div className="flex justify-between items-center">
              <span className="font-semibold">Client Name:</span>
              <span>{estimateData.clientName || defaultEstimate.clientName}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Function:</span>
              <span>{estimateData.functionName || defaultEstimate.functionName}</span>
            </div>
            {estimateData.location && (
              <div className="flex justify-between items-center">
                <span className="font-semibold">Location:</span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1.5" />
                  {estimateData.location}
                </span>
              </div>
            )}
            {estimateData.phoneNumber && (
              <div className="flex justify-between items-center">
                <span className="font-semibold">Client Phone:</span>
                <span className="flex items-center">
                  <Phone className="w-4 h-4 mr-1.5" />
                  {estimateData.phoneNumber}
                </span>
              </div>
            )}
            {estimateData.startDate && (
              <div className="flex justify-between items-center">
                <span className="font-semibold">Event Date(s):</span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1.5" />
                  {formatDateTime(estimateData.startDate)}
                  {estimateData.endDate && estimateData.startDate !== estimateData.endDate && ` - ${formatDateTime(estimateData.endDate)}`}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="font-semibold">Estimate ID:</span>
              <span>#{estimateData._id?.slice(-4)?.toUpperCase() || '0000'}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="font-semibold">Status:</span>
              <div className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusClasses(estimateData.status)}`}>
                <CheckCircle className="w-3 h-3 mr-1" />
                {estimateData.status.charAt(0).toUpperCase() + estimateData.status.slice(1)}
              </div>
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
            {currentStudioData.phone && (
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span>{currentStudioData.phone}</span>
              </div>
            )}
            {currentStudioData.email && (
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span>{currentStudioData.email}</span>
              </div>
            )}
            {currentStudioData.socialLinks?.website && (
              <div className="flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                <a href={`http://${currentStudioData.socialLinks.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline text-gray-700">
                  {currentStudioData.socialLinks.website}
                </a>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Description & Key Dates */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {estimateData.description && (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
              <FileText className="w-5 h-5 mr-2 text-orange-500" />
              Estimate Description
            </h3>
            <p className="text-gray-700 leading-relaxed text-sm">{estimateData.description}</p>
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
                <span>{formatDate(estimateData.createdAt)}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Valid Until:</span>
                <span>{formatDate(estimateData.validUntil || defaultEstimate.validUntil)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Table */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
          <Tag className="w-6 h-6 mr-3 text-purple-500" />
          Services Breakdown
        </h3>
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-100">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Service Description</th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-gray-700 uppercase tracking-wider w-32">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {estimateData.services && estimateData.services.length > 0 ? (
                estimateData.services.map((service, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900 flex items-center">
                        {getServiceIcon(service.serviceName)}
                        {service.serviceName || 'Unnamed Service'}
                      </div>
                      {service.description && (
                        <p className="text-xs text-gray-600 mt-1 ml-7">
                          {service.description}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-semibold text-gray-900">
                      {formatCurrency(service.total)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-8 text-center text-gray-500 text-sm">
                    No services listed for this estimate.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary, Notes, Policies, and QR Code */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6 border-t border-gray-100">
        {/* Financial Summary */}
        <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-red-500" />
            Financial Summary
          </h4>
          <div className="space-y-4 text-sm">
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span className="font-semibold">{formatCurrency(estimateData.subtotal)}</span>
            </div>

            {estimateData.discount > 0 && (
              <div className="flex justify-between text-green-700">
                <span>
                  Discount {estimateData.discountType === 'percentage' && estimateData.discount !== undefined ? `(${estimateData.discount}%)` : ''}:
                </span>
                <span className="font-semibold">- {formatCurrency(estimateData.discount)}</span>
              </div>
            )}

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="flex justify-between text-xl font-extrabold text-gray-900">
                <span>TOTAL ESTIMATE:</span>
                <span className="text-blue-600">{formatCurrency(estimateData.netTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Notes and Policies */}
        <div className="flex flex-col space-y-8">
            {estimateNotesArray.length > 0 && (
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-gray-500" />
                  Estimate Notes
                </h4>
                <ul className="list-disc list-inside text-gray-600 leading-relaxed text-sm">
                  {estimateNotesArray.map((note, index) => (
                    <li key={index}>{note}</li>
                  ))}
                </ul>
              </div>
            )}

            {currentStudioData.policies && (
              <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100">
                <h4 className="font-bold text-gray-800 mb-3 text-lg flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-gray-500" />
                  Important Policies
                </h4>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {currentStudioData.policies}
                </p>
              </div>
            )}

            {/* QR Code Placeholder - can be part of notes/policies section or standalone */}
            <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-100 flex flex-col items-center justify-center">
                <h4 className="font-bold text-gray-800 mb-3 text-lg">Scan to Confirm</h4>
                <div className="w-32 h-32 border border-gray-300 flex items-center justify-center bg-gray-50 text-gray-400">
                    <QrCode size={50} />
                    {/* Replace with actual QR code image or component */}
                    {/* <img src="path/to/generated/qr_code.png" alt="QR Code" className="w-full h-full object-contain" /> */}
                </div>
                <p className="text-xs text-gray-500 mt-2">Scan for booking and details</p>
            </div>
        </div>
      </div>


      {/* Footer */}
      <div className="text-center mt-10 pt-4 border-t border-gray-300 text-gray-500 text-sm">
        <p className="mb-1">Thank you for choosing {currentStudioData.studioName}!</p>
        <p>Generated on: {formatDate(new Date())}</p>
        <p className="mt-1">© {new Date().getFullYear()} {currentStudioData.studioName}. All rights reserved.</p>
      </div>
    </div>
  );
};

export default ThemeModern;