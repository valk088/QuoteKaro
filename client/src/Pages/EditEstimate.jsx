import Navbar from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import EditEstimateMainn from "../Components/EditEstimateMainn";

function EditEstimate() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
     
      <div className="flex md:flex-row flex-col md:h-screen">
        <Sidebar />
        <EditEstimateMainn/>
      </div>
    </div>
  );
}

export default EditEstimate;
