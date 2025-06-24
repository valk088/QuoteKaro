import React, { useState, useEffect, useRef } from "react";
const simulateBackendApi = async (data, endpoint) => {
  console.log(`Simulating API call to ${endpoint} with data:`, data);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Operation successful (simulated)." });
    }, 800);
  });
};
function MyServices() {

    const [newServiceName, setNewServiceName] = useState("");
  const [newServicePrice, setNewServicePrice] = useState("");
const [isSaving, setIsSaving] = useState(false);

    const handleAddService = async () => {
    if (newServiceName.trim() === "" || newServicePrice === "") {
      return;
    }
    if (isNaN(parseFloat(newServicePrice))) {
      return;
    }

    setIsSaving(true);
    try {
      const newService = {
        id: `srv${Date.now()}`,
        name: newServiceName.trim(),
        price: parseFloat(newServicePrice),
      };

      const result = await simulateBackendApi(
        { userId: userProfile.userId, service: newService },
        "/api/user/add-service"
      );

      if (result.success) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          services: [...prevProfile.services, newService],
        }));

        setNewServiceName("");
        setNewServicePrice("");
      }
    } catch (error) {
      console.error("Error adding service:", error);
    } finally {
      setIsSaving(false);
    }
  };
    const handleDeleteService = async (serviceId) => {
    setIsSaving(true);
    try {
      const result = await simulateBackendApi(
        { userId: userProfile.userId, serviceId },
        "/api/user/delete-service"
      );

      if (result.success) {
        setUserProfile((prevProfile) => ({
          ...prevProfile,
          services: prevProfile.services.filter(
            (service) => service.id !== serviceId
          ),
        }));
      }
    } catch (error) {
      console.error("Error deleting service:", error);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <div>
      <section>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <span className=" text-xl font-bold   bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-6">
              My Services & Pricing
            </span>

            {/* Add New Service Form */}
            <div className="mb-8 p-6 mt-4 bg-purple-100/10 rounded-xl border-2 border-purple-400/20">
              <h3 className="text-lg font-bold text-gray-700 mb-4">
                Add New Service
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label
                    htmlFor="service-name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Service Name
                  </label>
                  <input
                    id="service-name"
                    type="text"
                    value={newServiceName}
                    onChange={(e) => setNewServiceName(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500"
                    placeholder="e.g. Candid Photography"
                  />
                </div>
                <div>
                  <label
                    htmlFor="service-price"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Fixed Price (₹)
                  </label>
                  <input
                    id="service-price"
                    type="number"
                    value={newServicePrice}
                    onChange={(e) => setNewServicePrice(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-blue-500"
                    placeholder="e.g. 5000"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <button
                onClick={handleAddService}
                disabled={isSaving}
                className={`w-full md:w-auto px-6 py-2 rounded-lg font-medium transition-colors text-white  bg-gradient-to-r from-purple-600 to-pink-600  ${
                  isSaving
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : " bg-gradient-to-r from-purple-600 to-pink-600 "
                }`}
              >
                {isSaving ? "Adding Service..." : "Add Service"}
              </button>
            </div>

            {/* Display Existing Services */}
            {userProfile.services.length === 0 ? (
              <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-gray-500 mb-2">No services added yet</p>
                <p className="text-sm text-gray-400">
                  Add your first service above to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {userProfile.services.map((service) => (
                  <div
                    key={service.id}
                    className="relative bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow group"
                  >
                    <h4 className="font-bold text-gray-900 mb-1 pr-8">
                      {service.name}
                    </h4>
                    <p className="font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent  text-lg">
                      ₹{service.price.toFixed(2)}
                    </p>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      disabled={isSaving}
                      className="absolute top-3 right-3 p-1 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                      title={`Delete ${service.name}`}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
    </div>
  )
}

export default MyServices
