"use client";

import dynamic from "next/dynamic";

const ArticleCreation = dynamic(() => import("../../components/ArticleCreation"), { ssr: false });

const Page = () => {
  return <ArticleCreation />;
};

export default Page;
