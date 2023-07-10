import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Connexion from "../pages/Connexion";
import ArticleManagementDashboard from "../pages/ArticleManagementDashboard";
import ArticleCreation from "../pages/ArticleCreation";
import ArticleUpdate from "../pages/ArticleUpdate";
import Dashboard from "@pages/Dashboard";
import UserManagementDashboard from "@pages/UserManagementDashboard";
import UserUpdate from "@pages/UserUpdate";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/articlecreation" element={<ArticleCreation />} />
      <Route path="/articleupdate/:id" element={<ArticleUpdate />} />
      <Route path="/articlemanagementdashboard" element={<ArticleManagementDashboard />} />
      <Route path="/usermanagementdashboard" element={<UserManagementDashboard />} />
      <Route path="/userupdate/:id" element={<UserUpdate />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default AllRoutes;
