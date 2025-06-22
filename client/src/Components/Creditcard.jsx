import React from "react";
import {Crown,Zap} from "lucide-react";
import { useUser } from '../context/UserContext';
import { Link } from "react-router-dom";

function CreditCard() {
  const { userData , loading } = useUser();

  if(loading || !userData) {
    // Optionally return a loading skeleton or null while data is fetching
    return (
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <Crown size={24} />
          <div className="h-4 bg-white/30 rounded w-2/3"></div>
        </div>
        <div className="bg-white/20 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="h-3 bg-white/30 rounded w-1/2"></div>
            <Zap size={16} />
          </div>
          <div className="h-6 bg-white/30 rounded w-1/4"></div>
        </div>
        <div className="w-full bg-white/30 py-2 rounded-lg h-10"></div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Crown size={24} />
        <div>
          {/* Ensure userData.plan exists before accessing */}
          <h3 className="font-semibold">{userData.plan || 'No Plan'} Plan</h3>
          <p className="text-purple-100 text-sm">Active subscription</p>
        </div>
      </div>
      <div className="bg-white/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-100">Credits Remaining</span>
          <Zap size={16} />
        </div>
        {/* Ensure userData.left_credits exists before displaying */}
        <div className="text-2xl font-bold">{userData.left_credits !== undefined ? userData.left_credits : 'N/A'}</div>
      </div>
      <Link to="/plan-credits">
        <button className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
          Buy More Credits
        </button>
      </Link>
    </div>
  );
}

export default CreditCard;
