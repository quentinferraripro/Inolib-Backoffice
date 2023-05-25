import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Connexion from "../pages/Connexion";
import ArticleDashboard from "@pages/ArticleDashboard";
import ArticleCreation from "../pages/ArticleCreation";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/articledashboard" element={<ArticleDashboard />} />
      <Route path="/articlecreation" element={<ArticleCreation />} />
    </Routes>
  );
}

export default AllRoutes;
