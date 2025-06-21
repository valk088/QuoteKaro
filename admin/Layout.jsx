import React from "react";

import Sidebar from "./Components/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
