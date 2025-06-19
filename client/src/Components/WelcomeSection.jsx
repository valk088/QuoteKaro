import React, { useEffect } from 'react'
import {Bell} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';


function WelcomeSection({name}) {

   const { userData , loading } = useUser();
   if(loading || !userData) return null ;


  
    
  return (
    <div>
      <div className="hidden md:flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
                🚀 <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{name}</span>
              </h1>
              <p className="text-gray-600 mt-1"> Welcome back, <span className='font-bold'>{userData.studioName}!</span> </p>
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
              <Link to="/notifications" className="relative p-3 bg-white rounded-xl border border-gray-200 text-gray-600 hover:text-gray-800 shadow-sm">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </Link>
            </div>
          </div>
    </div>
  )
}

export default WelcomeSection
