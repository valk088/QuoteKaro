import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUser } from "./UserContext"; // Assuming useUser provides user authentication status

const EstimateContext = createContext();

const EstimateProvider = ({ children }) => {
  // Use useUser to get the user's UID and loading state reliably
  const { userData, loading: userLoading } = useUser();
  const firebaseUID = userData ? userData.firebaseUID : null; // Get UID from context

  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch estimates
  const fetchEstimates = async () => {
    // ONLY attempt to fetch if firebaseUID exists and is not null/undefined
    if (!firebaseUID) {
      // If there's no UID, we are not logged in, so no estimates to fetch.
      // Set estimates to empty array and loading to false immediately.
      setEstimates([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/estimates/get/${firebaseUID}`
      );
      if (res.data.success) {
        setEstimates(res.data.estimates);
      }
    } catch (error) {
      console.error("Error fetching estimates:", error);
      // It's good practice to clear estimates on error too, or show a specific message
      setEstimates([]);
      toast.error("Failed to load your estimates.");
    } finally {
      setLoading(false);
    }
  };

  // Delete estimate
  const deleteEstimate = async (id) => {
    // Also, ensure firebaseUID exists before allowing deletion if that's a backend requirement
    if (!firebaseUID) {
      toast.error("Please log in to delete estimates.");
      return;
    }

    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/estimate/delete/${id}`
      );
      if (res.data.success) {
        toast.success("Estimate deleted successfully ✅");
        await fetchEstimates(); // Refresh the list after deletion
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting");
    }
  };

  // Effect to fetch estimates
  useEffect(() => {
    
    if (!userLoading) {
      fetchEstimates();
    }
  }, [userLoading, firebaseUID]); // Depend on userLoading and firebaseUID

  return (
    <EstimateContext.Provider
      value={{
        estimates,
        loading,
        deleteEstimate,
        refreshEstimates: fetchEstimates,
      }}
    >
      {children}
    </EstimateContext.Provider>
  );
};

const useEstimates = () => useContext(EstimateContext);
export { EstimateProvider, useEstimates };