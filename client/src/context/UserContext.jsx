import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserData = useCallback(async (uid = null) => {
    const currentUID = uid || localStorage.getItem("firebaseUID");

    if (!currentUID) {
      setUserData(null);
      setIsAuthenticated(false);
      setLoading(false);
    }

    try {
      const res = await axios.get(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/users/get-profile/${currentUID}`
      );

      if (res.data.user) {
        setUserData(res.data.user);
        setIsAuthenticated(true); // User data successfully fetched, so authenticated
      } else {
        console.error("❌ User data not found in response:", res.data.message);
        localStorage.removeItem("firebaseUID");
        setIsAuthenticated(false);
        toast.error("User session invalid. Please log in again.");
      }
    } catch (err) {
      console.error("❌ Error fetching user profile:", err);

      localStorage.removeItem("firebaseUID");
      setUserData(null);
      setIsAuthenticated(false);
      toast.error("Failed to load user session. Please log in.");
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (firebaseUID) => {
    localStorage.setItem("firebaseUID", firebaseUID);

    await fetchUserData(firebaseUID);
    toast.success("Logged in successfully!");
  };

  const logout = () => {
    localStorage.removeItem("firebaseUID");
    setUserData(null);
    setIsAuthenticated(false);

    toast.success("Logged out successfully!");
  };

  const refresh = useCallback(() => {
    const firebaseUID = localStorage.getItem("firebaseUID");
    if (firebaseUID) {
      fetchUserData(firebaseUID);
    } else {
      setUserData(null);
      setIsAuthenticated(false);
      setLoading(false);
    }
  }, [fetchUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <UserContext.Provider
      value={{ userData, loading, isAuthenticated, login, logout, refresh }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
