import React, { useState } from "react";
import ArticleManagementModule from "../ui/ArticleDashboard/ArticleManagementModule";
import TestModal from "@components/TestModal";

export default function Test() {
  const [open, setOpen] = useState(false);

  const handleModal = () => setOpen(!open);
  const handleCloseModal = () => setOpen(false);

  return (
    <div className="relative">
      <ArticleManagementModule />
      <button className={open ? "hidden" : "absolute top-1/2 left-1/2"} onClick={handleModal}>
        Ouvrir modal
      </button>
      <TestModal open={open} onClose={handleCloseModal} />
    </div>
  );
}
