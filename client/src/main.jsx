import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./context/UserContext.jsx";
import { EstimateProvider } from "./context/EstimateContext.jsx";
import { HelmetProvider } from 'react-helmet-async';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider> 
    <UserProvider>
      <EstimateProvider>
        <App />
      </EstimateProvider>
    </UserProvider>
    </HelmetProvider>
  </StrictMode>
);
