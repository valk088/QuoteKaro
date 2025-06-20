import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getUserData = async () => {
    try {
      setLoading(true);
      const firebaseUID = localStorage.getItem("firebaseUID");
      if (!firebaseUID) return;

      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/get-profile/${firebaseUID}`);

      if (res.data.user) {
       setUserData(res.data.user);
      }
    } catch (err) {
      console.error("❌ Error loading profile", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading, refresh: getUserData }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook
export const useUser = () => useContext(UserContext);
