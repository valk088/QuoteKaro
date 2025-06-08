import React from "react";
import { Phone} from 'lucide-react';
function TopClients() {

    const topClients = [
    { name: "Rahul Sharma", phone: "+91 98765 43210", estimates: 8, lastEstimate: "2 days ago" },
    { name: "Priya Singh", phone: "+91 87654 32109", estimates: 5, lastEstimate: "3 days ago" },
    { name: "Amit Kumar", phone: "+91 76543 21098", estimates: 12, lastEstimate: "5 days ago" },
    { name: "Sneha Patel", phone: "+91 65432 10987", estimates: 3, lastEstimate: "1 week ago" }
  ];
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
          {topClients.map((client, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
            >
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{client.name}</h3>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Phone size={12} /> {client.phone}
                  </span>
                  <span className="text-sm text-gray-500">
                    {client.estimates} estimates
                  </span>
                  <span className="text-sm text-gray-500">
                    Last: {client.lastEstimate}
                  </span>
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
