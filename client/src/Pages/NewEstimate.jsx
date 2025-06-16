import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import CreateEstimate from "./CreateEstimate";

function NewEstimate() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <CreateEstimate/>
      </div>
    </div>
  );
}

export default NewEstimate;
