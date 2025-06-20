import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useUser } from "./UserContext";
import { Await } from 'react-router-dom';
const EstimateContext = createContext();

 const EstimateProvider = ({ children }) => {
  
  const firebaseUID = localStorage.getItem("firebaseUID");
  //  const { refresh } = useUser(); 

  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch estimates
  const fetchEstimates = async () => {
    
    try {
      setLoading(true);
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/estimates/get/${firebaseUID}`
      );
      if (res.data.success) {
        setEstimates(res.data.estimates);
        
      }
    } catch (error) {
      console.error("Error fetching estimates", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete estimate
  const deleteEstimate = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/estimate/delete/${id}`
      );
      if (res.data.success) {
        toast.success("Estimate deleted successfully ✅");
        await fetchEstimates();
         
              
        
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting");
    }
  };

  
  useEffect(() => {
    fetchEstimates();
    
     
  }, []);

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
