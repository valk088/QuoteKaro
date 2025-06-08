import { Plus,Eye,Edit,Send } from 'lucide-react';
function RecentEstimates() {
  const getStatusColor = (status) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "viewed":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };
  const recentEstimates = [
    {
      id: 1,
      client: "Rahul Sharma",
      occasion: "Wedding Photography",
      amount: "₹85,000",
      date: "2 days ago",
      status: "sent",
    },
    {
      id: 2,
      client: "Priya Singh",
      occasion: "Birthday Party",
      amount: "₹25,000",
      date: "3 days ago",
      status: "draft",
    },
    {
      id: 3,
      client: "Amit Kumar",
      occasion: "Corporate Event",
      amount: "₹1,20,000",
      date: "5 days ago",
      status: "viewed",
    },
    {
      id: 4,
      client: "Sneha Patel",
      occasion: "Pre-wedding Shoot",
      amount: "₹45,000",
      date: "1 week ago",
      status: "sent",
    },
    {
      id: 5,
      client: "Rohit Gupta",
      occasion: "Baby Shower",
      amount: "₹35,000",
      date: "1 week ago",
      status: "accepted",
    },
  ];
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between p-6 border-b border-gray-100">
        <h2 className="text-xl font-semibold text-gray-800">
          Recent Estimates
        </h2>
        <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors flex items-center gap-2">
          <Plus size={16} /> Create New
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Client
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Occasion
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Amount
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Date
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Status
              </th>
              <th className="text-left p-4 text-sm font-medium text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {recentEstimates.map((estimate) => (
              <tr
                key={estimate.id}
                className="border-b border-gray-50 hover:bg-gray-25"
              >
                <td className="p-4">
                  <div className="font-medium text-gray-800">
                    {estimate.client}
                  </div>
                </td>
                <td className="p-4 text-gray-600">{estimate.occasion}</td>
                <td className="p-4 font-medium text-gray-800">
                  {estimate.amount}
                </td>
                <td className="p-4 text-gray-500 text-sm">{estimate.date}</td>
                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      estimate.status
                    )}`}
                  >
                    {estimate.status}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-gray-600 hover:text-blue-600"
                      title="View"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      className="p-1 text-gray-600 hover:text-green-600"
                      title="Edit"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      className="p-1 text-gray-600 hover:text-purple-600"
                      title="Send via WhatsApp"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentEstimates;
