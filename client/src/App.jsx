import { useEffect } from "react";
import "./App.css";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { saveUIDToLocalStorage } from "./auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import ProfilePage from "./Pages/Profile";
import Dashboard from "./Pages/Dashboard";
import MyEstimates from "./Pages/MyEstimates";
import NewEstimate from "./Pages/NewEstimate";
import EditEstimate from "./Pages/EditEstimate";
import { Toaster } from "react-hot-toast";
import PlansCredits from "./Pages/PlansCredits";
import Notifications from "./Components/NotificationMainn";
// import PreviewPage from "./Pages/PreviewPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import TermsConditionsPage from "./Pages/TermsConditionsPage";
import RefundPolicyPage from "./Pages/RefundPolicyPage";
import AboutUsPage from "./Pages/AboutUsPage";
import LandingPage from "./Pages/LandingPage";
import PricingLandingPage from "./Pages/PricingLandingPage";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";
import ProfilePage from "./Pages/ProfilePage";
import PreferencePage from "./Pages/PreferencePage";
import Preference from "./Pages/Preference";

function App() {
  useEffect(() => {
    saveUIDToLocalStorage();
  }, []);

  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}></Route>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-estimates" element={<MyEstimates />} />
          <Route path="/edit-estimate/:id" element={<EditEstimate />} />
          <Route path="/new-estimate" element={<NewEstimate />} />
          <Route path="/plan-credits" element={<PlansCredits />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings/profile" element={<ProfilePage />} />
          <Route path="/settings/preferences" element={<Preference />} />
          {/* <Route path="/preview/:id" element={<PreviewPage />} /> */}

          {/* Add routes for your policy pages if they are separate components */}
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/return-refund-policy" element={<RefundPolicyPage />}/>
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/pricing" element={<PricingLandingPage />} />
          

          <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
          
        </Routes>
      </BrowserRouter>
      
    </>
  );
}

export default App;
