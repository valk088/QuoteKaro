import React from 'react'
import {Bell} from 'lucide-react';

function WelcomeSection({name}) {
    const studioData = {
    name: "Creative Studio Pro",
    credits: 125,
    plan: "Premium",
    profileComplete: false,
    currentTheme: "Modern Purple"
  };
  return (
    <div>
      <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                🚀 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{name}</span>
              </h1>
              <p className="text-gray-600 mt-1">Welcome back, {studioData.name}! Here's your studio overview.</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Today</p>
                <p className="font-medium text-gray-800">{new Date().toLocaleDateString('en-IN', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</p>
              </div>
              <button className="relative p-3 bg-white rounded-xl border border-gray-200 text-gray-600 hover:text-gray-800 shadow-sm">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
            </div>
          </div>
    </div>
  )
}

export default WelcomeSection
