import React, { useState, useEffect, useRef } from "react";
import WelcomeSection from "../Components/WelcomeSection";
import { useUser } from "../context/UserContext";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";
import axios from "axios";
import ServicesManagement from "./ServicesManagement";
import { toast } from "react-hot-toast"; // Added toast for better notifications

function PreferencePage() {
  const { userData, refresh } = useUser();

  const API_BASE_URL =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
  const [localUserProfile, setLocalUserProfile] = useState({
    selectedEstimateTheme: userData?.selectedEstimateTheme,
  });

  const [allEstimateTemplates, setAllEstimateTemplates] = useState([]);

  const currentPlan = userData?.plan || "Basic";

  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false); // Corrected variable name

  // Carousel state
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Function to determine visible items based on current screen width
  const getVisibleItems = () => {
    if (window.innerWidth >= 1024) { // lg screens
      return 4;
    } else if (window.innerWidth >= 768) { // md screens
      return 2;
    } else { // sm and xs screens
      return 1;
    }
  };

  const [visibleItems, setVisibleItems] = useState(getVisibleItems());

  useEffect(() => {
    const handleResize = () => {
      setVisibleItems(getVisibleItems());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Run once on mount to set initial visible items

  // Fetch estimate templates on component mount
  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);

      try {
        const response = await axios.get(`${API_BASE_URL}/api/templates`);
        setAllEstimateTemplates(response.data.templates);

        // Set initial theme if user has none or if default theme is not found
        if (
          !userData?.selectedEstimateTheme &&
          response.data.templates.length > 0
        ) {
          setLocalUserProfile((prev) => ({
            ...prev,
            selectedEstimateTheme: response.data.templates[0].id,
          }));
        } else if (userData?.selectedEstimateTheme) {
            setLocalUserProfile((prev) => ({
                ...prev,
                selectedEstimateTheme: userData.selectedEstimateTheme,
            }));
            // If user has a selected theme, try to set the carousel to show it
            const themeIndex = response.data.templates.findIndex(
                (template) => template.id === userData.selectedEstimateTheme
            );
            if (themeIndex !== -1) {
                // Ensure the index is within bounds for the current view
                const maxAllowedIndex = Math.max(0, response.data.templates.length - getVisibleItems());
                setCurrentIndex(Math.min(themeIndex, maxAllowedIndex));
            }
        }
      } catch (error) {
        console.error("Error fetching estimate templates:", error);
        toast.error("Failed to fetch estimate templates.");
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [userData?.selectedEstimateTheme, userData?._id]); // Add userData.selectedEstimateTheme to dependency array

  // Update local profile when userData changes (e.g., after initial load or refresh)
  useEffect(() => {
    if (userData) {
      setLocalUserProfile({
        selectedEstimateTheme:
          userData.selectedEstimateTheme || "basic-minimal",
      });
    }
  }, [userData]);

  // Carousel navigation functions
  const nextSlide = () => {
    const maxIndex = Math.max(0, allEstimateTemplates.length - visibleItems);
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleSelectTemplate = async (templateId) => {
    if (isSaving) return; // Prevent multiple clicks

    setIsSaving(true);
    try {
      const userIdToUpdate = userData?._id;

      if (!userIdToUpdate) {
        toast.error("User ID not available for update.");
        return;
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/users/${userIdToUpdate}/preferences`,
        { selectedEstimateTheme: templateId }
      );

      if (response.data.success) {
        setLocalUserProfile((prevProfile) => ({
          ...prevProfile,
          selectedEstimateTheme: templateId,
        }));
        refresh(); // Refresh user context to reflect changes globally
        toast.success("Template updated successfully!");
      } else {
        toast.error(response.data.message || "Failed to update template.");
      }
    } catch (error) {
      console.error("Error selecting template:", error);
      toast.error("Error updating template. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!userData) {
    return (
      <div className="flex-1 p-0 m-0 md:p-8 overflow-y-auto flex items-center justify-center h-screen">
        <div className="text-gray-500">Loading user data...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-0 m-0 md:p-8 overflow-y-auto">
      {/* Header */}
      <WelcomeSection name="Preferences" /> {/* Changed to "Preferences" for broader scope */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Services Section */}
        <section className="mb-12">
          <ServicesManagement userId={userData._id} />
        </section>

        {/* Template Selection Section */}
        <section className="mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6"> {/* Larger shadow, more rounded */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Choose Estimate Template
              </h2>
              {loading ? (
                <div className="text-gray-500">Loading templates...</div>
              ) : (
                <div className="flex items-center space-x-2">
                  {/* Prev Button */}
                  <button
                    onClick={prevSlide}
                    disabled={currentIndex === 0 || allEstimateTemplates.length <= visibleItems}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700"
                  >
                    <ArrowBigLeftDash size={24} /> {/* Larger icon */}
                  </button>

                  {/* Next Button */}
                  <button
                    onClick={nextSlide}
                    disabled={currentIndex >= allEstimateTemplates.length - visibleItems || allEstimateTemplates.length <= visibleItems}
                    className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-gray-700"
                  >
                    <ArrowBigRightDash size={24} /> {/* Larger icon */}
                  </button>
                </div>
              )}
            </div>

            {/* Template Carousel */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-pulse">
                {Array.from({ length: visibleItems }).map((_, i) => (
                  <div key={i} className="bg-gray-200 rounded-lg h-64 w-full"></div>
                ))}
              </div>
            ) : allEstimateTemplates.length === 0 ? (
                <div className="text-center text-gray-500 py-8">No estimate templates available.</div>
            ) : (
              <div className="overflow-hidden">
                <div
                  ref={carouselRef}
                  className="flex transition-transform duration-300 ease-in-out"
                  style={{
                    transform: `translateX(-${currentIndex * (100 / visibleItems)}%)`, // Dynamic translation
                  }}
                >
                  {allEstimateTemplates.map((template) => {
                    const isUnlocked =
                      (currentPlan === "Basic" &&
                        [
                          "basic-minimal",
                          "standard-classic",
                          "modern-bold",
                          "clean-professional",
                          "creative-artistic",
                          "simple-corporate",
                        ].includes(template.id)) ||
                      (currentPlan === "Professional" &&
                        [
                          "basic-minimal",
                          "standard-classic",
                          "modern-bold",
                          "clean-professional",
                          "creative-artistic",
                          "simple-corporate",
                          "pro-luxury",
                          "pro-sleek",
                          "pro-vibrant",
                          "pro-elegant",
                          "pro-geometric",
                        ].includes(template.id)) ||
                      currentPlan === "Enterprise"; // Enterprise unlocks all

                    const isSelected =
                      localUserProfile.selectedEstimateTheme === template.id;

                    return (
                      <div
                        key={template.id}
                        className={`flex-none px-2 
                            ${visibleItems === 1 ? 'w-full' : ''}
                            ${visibleItems === 2 ? 'w-1/2' : ''}
                            ${visibleItems === 4 ? 'w-1/4' : ''}
                        `} // Dynamic width based on visibleItems
                      >
                        <div
                          className={`
                            relative bg-white rounded-lg border-2 cursor-pointer transition-all duration-200 h-full overflow-hidden shadow-sm
                            ${
                              isSelected
                                ? "border-purple-500 ring-2 ring-purple-200 shadow-lg" // Highlight selected with purple
                                : "border-gray-200 hover:border-gray-300"
                            }
                            ${
                              !isUnlocked
                                ? "opacity-60 cursor-not-allowed grayscale" // Grayscale for locked templates
                                : "hover:shadow-md"
                            }
                          `}
                          onClick={() =>
                            isUnlocked &&
                            !isSaving &&
                            handleSelectTemplate(template.id)
                          }
                        >
                          {/* Lock overlay for locked templates */}
                          {!isUnlocked && (
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-lg z-10 p-4">
                              <svg
                                className="w-8 h-8 text-white mb-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-5a2 2 0 00-2-2H6a2 2 0 00-2-2V7a4 4 0 118 0v4z"
                                />
                              </svg>
                              <span className="text-white text-sm font-semibold text-center leading-tight">
                                Requires {template.plan} Plan
                              </span>
                            </div>
                          )}

                          {/* Template Image with A4 aspect ratio */}
                          <div className="aspect-[3/4] w-full overflow-hidden rounded-t-lg">
                            <img
                              src={template.image}
                              alt={template.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                // Placeholder image if real image fails to load
                                e.target.src = `https://placehold.co/400x600/E0E0E0/808080?text=${encodeURIComponent(
                                  template.name
                                )}`;
                              }}
                            />
                          </div>

                          {/* Template Info */}
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-semibold text-gray-900 text-base truncate">
                                {template.name}
                              </h3>
                              {isSelected && (
                                <svg
                                  className="w-5 h-5 text-purple-500 flex-shrink-0"
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              )}
                            </div>
                            <p className="text-sm text-gray-500 mb-3 line-clamp-2">
                              {template.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                                  template.plan === "Basic"
                                    ? "bg-gray-200 text-gray-800"
                                    : template.plan === "Professional"
                                    ? "bg-blue-200 text-blue-800"
                                    : "bg-purple-200 text-purple-800"
                                }`}
                              >
                                {template.plan}
                              </span>
                              {isSaving && isSelected && (
                                <span className="text-sm text-purple-500">Saving...</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Carousel Indicators */}
            {!loading && allEstimateTemplates.length > visibleItems && ( // Only show indicators if loading is done and there's more than one visible item
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({
                  length: Math.max(1, allEstimateTemplates.length - visibleItems + 1), // Adjust length for correct number of dots
                }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      currentIndex === index ? "bg-purple-500 w-4" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}

export default PreferencePage;