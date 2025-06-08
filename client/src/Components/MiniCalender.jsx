import React from 'react'
import {

  Calendar,
  
} from "lucide-react";
function MiniCalender() {
  return (
     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <Calendar size={20} className="text-gray-600" />
              <h3 className="font-semibold text-gray-800">Upcoming Events</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    Wedding Shoot
                  </div>
                  <div className="text-xs text-gray-500">
                    Tomorrow, 10:00 AM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    Birthday Party
                  </div>
                  <div className="text-xs text-gray-500">Dec 15, 6:00 PM</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    Wedding Shoot
                  </div>
                  <div className="text-xs text-gray-500">
                    Tomorrow, 10:00 AM
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-gray-800">
                    Birthday Party
                  </div>
                  <div className="text-xs text-gray-500">Dec 15, 6:00 PM</div>
                </div>
              </div>
            </div>
          </div>
  )
}

export default MiniCalender
