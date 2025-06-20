import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useEstimates } from "../context/EstimateContext";
import axios from "axios";

// Import themes
import ThemeSimple from "../components/EstimateThemes/ThemeSimple";
import ThemeElegant from "../components/EstimateThemes/ThemeElegant";
import ThemeModern from "../components/EstimateThemes/ThemeModern";

const PreviewEstimate = () => {
  const { id } = useParams();
  const {estimates} = useEstimates();
  const { userData, loading } = useUser();

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/estimates/get-by-id/${id}`)
      .then(res => {
        if (res.data.success) setEstimate(res.data.estimate);
      });
  }, [id]);

  if (!estimates || loading || !userData) return <div>Loading...</div>;
  
  const selectedTheme = userData.selectedEstimateTheme ;
  
  const renderTheme = () => {
    switch (selectedTheme) {
      case "elegant": return <ThemeElegant estimate={estimates} studio={userData} />;
      case "modern": return <ThemeModern estimate={estimates} studio={userData} />;
      default: return <ThemeSimple estimate={estimates} studio={userData} />;
    }
  };

  return <div className="min-h-screen bg-gray-100 p-6">{renderTheme()}</div>;
};

export default PreviewEstimate;
