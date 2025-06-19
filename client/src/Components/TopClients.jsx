import {useState} from "react";
import { Phone } from "lucide-react";
import { useEstimates } from "../context/EstimateContext";


function TopClients() {
  const { estimates, loading } = useEstimates();
  if (loading || !estimates) return null;

  
  const clientMap = {};

  estimates.forEach((estimate) => {
    const { clientName, date } = estimate;
    if (!clientMap[clientName]) {
      clientMap[clientName] = {
        name: clientName,
        phone: estimate.phone || "N/A", 
        
      };
    } else {
      clientMap[clientName].estimates += 1;
      if (new Date(date) > clientMap[clientName].lastEstimateDate) {
        clientMap[clientName].lastEstimateDate = new Date(date);
      }
    }
  });

  // Step 2: Convert to array and sort by estimate count
  const sortedClients = Object.values(clientMap)
    .sort((a, b) => b.estimates - a.estimates)
    .slice(0, 4); // top 4 clients

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">Top Clients</h2>
        <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
          View All
        </button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {sortedClients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{client.name}</h3>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Phone size={12} /> {client.phone}
                  </span>
                  <span>{client.estimates} estimates</span>
                  
                </div>
              </div>
              <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                View Estimates
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TopClients;
