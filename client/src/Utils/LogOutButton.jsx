import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // adjust the path based on your project
import { useNavigate } from "react-router-dom";

import React from "react";
function LogOutButton() {
    const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth); 
      localStorage.removeItem("firebaseUID"); 
      console.log("🚪 Logged out successfully");
     
      localStorage.clear(); 

      navigate("/login" , { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      
    }
  };

  return <div>
    <button onClick={handleLogout} className="border p-2 m-2 cursor-pointer ">Logout</button>
  </div>;
}

export default LogOutButton;
