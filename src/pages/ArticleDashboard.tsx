import ArticleTab from "@components/ArticleTab";
import React from "react";

const tabs = [
  { id: 1, title: "Mes informations", creationDate: 4 },
  { id: 2, title: "Mot de passe", creationDate: 5 },
  { id: 3, title: "Mes documents", creationDate: 6 },
  { id: 4, title: "QCM", creationDate: 7 },
];

export default function ArticleDashboard() {
  return (
    <table>
      <tbody>
        {tabs.map((tab) => (
          <ArticleTab key={tab.id} title={tab.title} creationDate={tab.creationDate} />
        ))}
      </tbody>
    </table>
  );
}
