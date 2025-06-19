import Navbar from "../Components/Navbar";
import PlansCreditsMainn from "../Components/PlansCreditsMainn";
import Sidebar from "../Components/Sidebar";

function PlansCredits() {
  return (
    <div className="min-h-full bg-gray-50 ">
      
      <Navbar />

      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <PlansCreditsMainn />
      </div>
    </div>
  );
}

export default PlansCredits;
