import React,{useEffect} from "react";
import {Crown,Zap} from "lucide-react";
import { useUser } from '../context/UserContext';
import { Link } from "react-router-dom";
function CreditCard() {
     const { userData , loading ,refresh} = useUser();
      if(loading || !userData) return null ;

      
      
      
  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl p-6 text-white">
      <div className="flex items-center gap-3 mb-4">
        <Crown size={24} />
        <div>
          <h3 className="font-semibold">{userData.plan} Plan</h3>
          <p className="text-purple-100 text-sm">Active subscription</p>
        </div>
      </div>
      <div className="bg-white/20 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-purple-100">Credits Remaining</span>
          <Zap size={16} />
        </div>
        <div className="text-2xl font-bold">{userData.left_credits}</div>
      </div>
      <Link to="/plan-credits"><button  className="w-full bg-white text-purple-600 py-2 rounded-lg font-medium hover:bg-purple-50 transition-colors">
        Buy More Credits
      </button>
      </Link>
    </div>
  );
}

export default CreditCard;
