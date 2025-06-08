import React, { useState } from "react";
import BellIcon from "../Utils/BellIcon.jsx";
import CreditsBtn from "../Utils/CreditsBtn.jsx";

const settings = ["Profile", "Account", "Logout"];

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <nav className="md:hidden bg-transparent border-b border-gray-200 text-white ">
      <div className="max-w-8xl mx-auto px-4 py-1">
        <div className="flex justify-between items-center h-16">
          {/* LOGO - Always visible */}
          <a href="/dashboard">
            <h1 className="text-lg font-bold text-purple-600">QuoteKaro </h1>
          </a>

          {/* Right Icons */}
          <div className="flex items-center space-x-3">
            {/* Bell Icon - Always visible */}
            <BellIcon />

            {/* CreditsBtn - Only on desktop */}
            <div className="hidden md:block">
              <CreditsBtn />
            </div>

            {/* Avatar */}
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="focus:outline-none"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">CS</span>
                </div>
              </button>

              {/* Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded-lg shadow-lg z-10">
                  {settings.map((setting) => (
                    <button
                      key={setting}
                      onClick={() => setShowUserMenu(false)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {setting}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
