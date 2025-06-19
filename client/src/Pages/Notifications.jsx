import Navbar from "../Components/Navbar";
import NotificationMainn from "../Components/NotificationMainn";
import Sidebar from "../Components/Sidebar";

function Notifications() {
  return (
    <div className="min-h-full bg-gray-50 ">
      
      <Navbar />

      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <NotificationMainn />
      </div>
    </div>
  );
}

export default Notifications;
