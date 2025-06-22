import React from "react";
import { Copy, Share2 } from "lucide-react";
import WelcomeSection from "./WelcomeSection";
import QuickStates from "./QuickStates";
import RecentEstimates from "./RecentEstimates";
import CreditCard from "./CreditCard"; // Corrected import path for CreditCard
import MiniCalender from "./MiniCalender";

function DashboardMainn() {
  return (
    <div className="flex-1 p-4 md:p-8 overflow-y-auto">
      <WelcomeSection name="Dashboard" />

      <QuickStates />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 ">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          <RecentEstimates />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <CreditCard />
          <MiniCalender />

          {/* Website Link (uncommented if desired) */}
          {/*
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">
              Your Studio Profile
            </h3>
            <div className="bg-gray-50 rounded-lg p-3 mb-3">
              <div className="text-sm text-gray-600 break-all">
                quotekaro.com/creativestudiopro
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 flex items-center justify-center gap-2 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                <Copy size={16} /> Copy
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-purple-600 text-white py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                <Share2 size={16} /> Share
              </button>
            </div>
          </div>
          */}
        </div>
      </div>
    </div>
  );
}

export default DashboardMainn;
