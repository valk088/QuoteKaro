import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const EstimateContext = createContext();

export const EstimateProvider = ({ children }) => {
  const firebaseUID = localStorage.getItem("firebaseUID");
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);

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

useEffect(() => {
  fetchEstimates();
}, [Location.pathname]);

  return (
    <EstimateContext.Provider value={{ estimates, loading, refreshEstimates: fetchEstimates }}>
      {children}
    </EstimateContext.Provider>
  );
};

export const useEstimates = () => useContext(EstimateContext);
