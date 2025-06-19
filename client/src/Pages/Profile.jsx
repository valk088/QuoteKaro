import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  Camera,
  Instagram,
  Facebook,
  Youtube,
  Link2,
  MapPin,
  Phone,
  Mail,
  Save,
  X,
  CircleChevronLeft,
  Check,
  Upload,
  Edit,
} from "lucide-react";
import axios from "axios";

export default function ProfilePage() {
  // State for form data
  const [formData, setFormData] = useState({
    firebaseUID: "",
    email: "",
    studioName: "",
    phone: "",
    phone2: "",
    caption: "",
    logoUrl: "",
    website: "",
    socialLinks: {
      instagram: "",
      facebook: "",
      youtube: "",
    },
    address: {
      d_address: "",
      city: "",
      state: "",
      pincode: "",
    },
    policies: "",
    notes: "",
  });

  const [isEditing, setIsEditing] = useState();
  const [isMobile, setIsMobile] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [logoFile, setLogoFile] = useState(null);
  const [showCropper, setShowCropper] = useState(false);
  const [cropperImg, setCropperImg] = useState("");
  const [cropArea, setCropArea] = useState({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  });

  // Refs
  const fileInputRef = useRef(null);
  const cropperCanvasRef = useRef(null);

  // Check if mobile on mount and window resize
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const firebaseUID = localStorage.getItem("firebaseUID");
        console.log("🔍 UID in localStorage:", firebaseUID);

        if (!firebaseUID) return;

        const res = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/users/get-profile/${firebaseUID}`
        );
        console.log("📦 API Response:", res.data);

        if (res.data.user) {
          setFormData(res.data.user);
        }
      } catch (err) {
        console.error("❌ Error loading profile", err);
      }
    };

    fetchProfile();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  // Handle file selection for logo
  const handleLogoSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogoFile(file);

      // Create URL for cropper preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCropperImg(e.target.result);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle cropping functionality
  const handleCrop = () => {
    if (!cropperCanvasRef.current || !cropperImg) return;

    // In a real app, this would create a cropped version using canvas
    // For this demo, we'll just use the original image
    setShowCropper(false);

    // In a real implementation, you'd upload to Cloudinary here
    // For the demo, we'll just set a placeholder URL
    setFormData({
      ...formData,
      logoUrl: cropperImg,
    });

    showNotification("Logo updated successfully", "success");
  };

  // Cancel cropping
  const cancelCrop = () => {
    setShowCropper(false);
    setLogoFile(null);
    setCropperImg("");
  };

  // Save profile data
  const saveProfile = async () => {
    try {
      setIsSaving(true);

      const firebaseUID = localStorage.getItem("firebaseUID");

      if (!firebaseUID) {
        showNotification("User ID missing. Please re-login.", "error");
        return;
      }

      const payload = {
        ...formData,
        firebaseUID, // force ensure UID is sent
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/create-profile`,
        payload
      );

      showNotification("Profile saved successfully!", "success");
      setIsEditing(false);
    } catch (error) {
      showNotification("Error saving profile", "error");
      console.error("Error saving profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Show notification helper
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Render different sections of the form
  const renderPersonalInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-bold text-purple-600 mb-4">
        Personal Information
      </h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Studio Name
          </label>
          <input
            type="text"
            name="studioName"
            value={formData.studioName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-400 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Primary Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Secondary Phone (Optional)
          </label>
          <input
            type="tel"
            name="phone2"
            value={formData.phone2}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Caption / Tagline
          </label>
          <input
            type="text"
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website (Optional)
          </label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">Address</h3>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Street Address
          </label>
          <input
            type="text"
            name="address.d_address"
            value={formData.address?.d_address}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <input
            type="text"
            name="address.city"
            value={formData.address?.city}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State
          </label>
          <input
            type="text"
            name="address.state"
            value={formData.address?.state}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Pincode
          </label>
          <input
            type="text"
            name="address.pincode"
            value={formData.address?.pincode}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
    </div>
  );

  const renderSocialLinks = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        Social Media Links
      </h3>

      <div className="grid md:grid-cols-1 gap-4">
        <div className="flex items-center">
          <Instagram className="mr-2 text-purple-600" size={20} />
          <input
            type="url"
            name="socialLinks.instagram"
            value={formData.socialLinks?.instagram}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Instagram URL"
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex items-center">
          <Facebook className="mr-2 text-purple-600" size={20} />
          <input
            type="url"
            name="socialLinks.facebook"
            value={formData.socialLinks?.facebook}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="Facebook URL"
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        <div className="flex items-center">
          <Youtube className="mr-2 text-purple-600" size={20} />
          <input
            type="url"
            name="socialLinks.youtube"
            value={formData.socialLinks?.youtube}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="YouTube URL"
            className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          />
        </div>
      </div>
    </div>
  );

  const renderAdditionalInfo = () => (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        Additional Information
      </h3>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Policies
        </label>
        <textarea
          name="policies"
          value={formData.policies}
          onChange={handleChange}
          disabled={!isEditing}
          rows={4}
          className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          placeholder="Booking policies, cancellation policies, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Notes
        </label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          disabled={!isEditing}
          rows={4}
          className="w-full p-2 border-3 border-purple-200 rounded-xl focus:ring-purple-500 focus:border-purple-500"
          placeholder="Additional notes or information"
        />
      </div>
    </div>
  );

  // Main render
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      {/* Header */}
      <header className=" bg-gradient-to-l from-purple-600 via-pink-400 to-purple-500 text-white p-4 md:p-6">
        <div>
          <Link to="/dashboard"> <CircleChevronLeft size={24}  /> </Link>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl md:text-3xl font-bold">
              Profile Management
            </h1>

            <div className="mt-4 md:mt-0">
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={cancelCrop}
                    className="px-4 py-2 bg-white text-purple-700 font-semibold rounded-md hover:bg-gray-100 transition flex items-center"
                  >
                    <X size={18} className="mr-1 font-bold" /> Cancel
                  </button>

                  <button
                    onClick={saveProfile}
                    disabled={isSaving}
                    className="px-4 py-2 bg-black text-white rounded-md font-semibold hover:bg-purple-600 transition flex items-center"
                  >
                    {isSaving ? (
                      "Saving..."
                    ) : (
                      <>
                        <Save size={18} className="mr-1" /> Save Profile
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-black text-white   font-semibold   rounded-lg hover:bg-gray-100 transition flex items-center"
                >
                  <Edit size={18} className="mr-1" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-6 px-4 ">
        {/* Profile Overview / Logo Section */}
        <div className="bg-white rounded-2xl  border-none shadow-md p-6 mb-6 flex flex-col md:flex-row">
          <div className="md:w-1/3 mb-6 md:mb-0 flex justify-center">
            <div className="relative">
              <div className="w-40 h-40 rounded-full border-4 border-purple-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                {formData.logoUrl ? (
                  <img
                    src={formData.logoUrl}
                    alt="Profile Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Camera size={48} className="text-gray-400" />
                )}
              </div>

              {isEditing && (
                <button
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700"
                >
                  <Upload size={16} />
                </button>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoSelect}
                className="hidden"
              />
            </div>
          </div>

          <div className="md:w-2/3">
            <h2 className="text-3xl font-sans font-bold text-purple-500">
              {formData.studioName || "Your Studio Name"}
            </h2>

            <div className="text-gray-600 font-semibold mt-1">
              {formData.caption || "Your professional tagline here"}
            </div>

            <div className="mt-4 space-y-2">
              {formData.email && (
                <div className="flex items-center font-semibold">
                  <Mail size={16} className="text-purple-600 mr-2" />
                  <span>{formData.email}</span>
                </div>
              )}

              {formData.phone && (
                <div className="flex items-center">
                  <Phone size={16} className="text-purple-600 mr-2" />
                  <span>{formData.phone}</span>
                </div>
              )}

              {formData.address?.city && formData.address.state && (
                <div className="flex items-center">
                  <MapPin size={16} className="text-purple-600 mr-2" />
                  <span>
                    {formData.address.city}, {formData.address.state}
                    {formData.address.pincode &&
                      ` - ${formData.address.pincode}`}
                  </span>
                </div>
              )}

              {formData.website && (
                <div className="flex items-center">
                  <Link2 size={16} className="text-purple-600 mr-2" />
                  <a
                    href={
                      formData.website.startsWith("http://") ||
                      formData.website.startsWith("https://")
                        ? formData.website
                        : `https://${formData.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    {formData.website
                      .replace(/^https?:\/\//i, "")
                      .replace(/\/$/, "")}
                  </a>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-3">
              {formData.socialLinks?.instagram && (
                <a
                  href={formData.socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <Instagram size={20} />
                </a>
              )}

              {formData.socialLinks?.facebook && (
                <a
                  href={formData.socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <Facebook size={20} />
                </a>
              )}

              {formData.socialLinks?.youtube && (
                <a
                  href={formData.socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-600 hover:text-purple-800"
                >
                  <Youtube size={20} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Form Sections */}
        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : "md:grid-cols-2"
          } gap-6`}
        >
          <div>
            {renderPersonalInfo()}
            {renderSocialLinks()}
          </div>

          <div>
            {renderAddress()}
            {renderAdditionalInfo()}
          </div>
        </div>
      </main>

      {/* Image Cropper Modal */}
      {showCropper && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold mb-4">Crop Your Logo</h3>

            <div className="mb-6 border border-gray-300 rounded-lg overflow-hidden">
              <div className="relative" style={{ height: "300px" }}>
                <img
                  src={cropperImg}
                  alt="Preview for cropping"
                  className="max-w-full max-h-full object-contain"
                  ref={cropperCanvasRef}
                />
                {/* Simplified cropper UI for demo */}
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border-2 border-purple-500 bg-purple-200 bg-opacity-20 cursor-move" />
              </div>
              <div className="p-2 text-center text-sm text-gray-500">
                Drag to reposition. Resize handles would be available in a real
                implementation.
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelCrop}
                className="px-4 py-2 border-3 border-purple-200 rounded-xl hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={handleCrop}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
              >
                Apply Crop
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification */}
      {notification.show && (
        <div
          className={`fixed bottom-4 right-4 py-2 px-4 rounded-md shadow-lg max-w-xs z-50 flex items-center
          ${
            notification.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {notification.type === "success" ? (
            <Check size={16} className="mr-2" />
          ) : (
            <X size={16} className="mr-2" />
          )}
          <span>{notification.message}</span>
        </div>
      )}
    </div>
  );
}
