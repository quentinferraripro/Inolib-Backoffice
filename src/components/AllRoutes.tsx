import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Connexion from "../pages/Connexion";
import ArticleManagementDashboard from "../pages/ArticleManagementDashboard";
import ArticleCreation from "../pages/ArticleCreation";
import ArticleModification from "../pages/ArticleModification";
import Dashboard from "@pages/Dashboard";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/articlecreation" element={<ArticleCreation />} />
      <Route path="/articlemodification" element={<ArticleModification />} />
      <Route path="/articlemanagementdashboard" element={<ArticleManagementDashboard />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AllRoutes;
