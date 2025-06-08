import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import DashboardMainn from "../Components/DashboardMainn";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <DashboardMainn/>
      </div>
    </div>
  );
}

export default Dashboard;
