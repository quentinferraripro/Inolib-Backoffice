import ArticleManagementModule from "../ui/ArticleDashboard/ArticleManagementModule";
import TestModal from "@components/TestModal";

export default function Test() {
  return (
    <div className="relative">
      <ArticleManagementModule />
      <button className={open ? "hidden" : "absolute top-1/2 left-1/2"}>Ouvrir modal</button>
    </div>
  );
}
