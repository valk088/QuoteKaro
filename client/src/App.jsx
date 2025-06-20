import   {useEffect}  from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { saveUIDToLocalStorage } from "./auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import MyEstimates from "./Pages/MyEstimates";
import NewEstimate from "./Pages/NewEstimate";
import EditEstimate from "./Pages/EditEstimate";
import { Toaster } from "react-hot-toast";
import PlansCredits from "./Pages/PlansCredits";
import Notifications from "./Components/NotificationMainn";
import PreviewPage from "./Pages/PreviewPage";

function App() {
  useEffect(() => {
    saveUIDToLocalStorage();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-estimates" element={<MyEstimates />} />
          <Route path="/edit-estimate/:id" element={<EditEstimate />} />
          <Route path="/new-estimate" element={<NewEstimate />}/>
          <Route path="/plan-credits" element={<PlansCredits />}/>
          <Route path="/notifications" element={<Notifications />}/>
          <Route path="/settings/profile" element={<ProfilePage />}/>
          <Route path="/preview/:id" element={<PreviewPage />}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
