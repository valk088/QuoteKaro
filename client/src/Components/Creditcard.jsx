import React from "react";
import {Crown,Zap} from "lucide-react";
function Creditcard() {

    const studioData = {
    name: "Creative Studio Pro",
    credits: 125,
    plan: "Premium",
    profileComplete: false,
    currentTheme: "Modern Purple",
  };
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Crown size={24} />
        <div>
          <h3 className="font-semibold">{studioData.plan} Plan</h3>
          <p className="text-purple-100 text-sm">Active subscription</p>
        </div>
      </div>
      <div className="bg-white/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-100">Credits Remaining</span>
          <Zap size={16} />
        </div>
        <div className="text-2xl font-bold">{studioData.credits}</div>
      </div>
      <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
        Buy More Credits
      </button>
    </div>
  );
}

export default Creditcard;
