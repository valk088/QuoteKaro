import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import DashboardMainn from "../Components/DashboardMainn";

function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating orbs */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 blur-3xl animate-pulse -z-10"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-br from-pink-200 to-purple-200 rounded-full opacity-20 blur-3xl animate-pulse -z-60 delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-gradient-to-br from-blue-300 to-purple-200 rounded-full opacity-10 blur-2xl -z-10 animate-pulse  delay-500"></div>
        
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139, 92, 246, 0.3) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      <Navbar />
     
      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <DashboardMainn/>
      </div>
    </div>
  );
}

export default Dashboard;
