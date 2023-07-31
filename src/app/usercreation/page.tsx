"use client";

import dynamic from "next/dynamic";

const Usercreation = dynamic(() => import("../../components/UserCreation"), { ssr: false });

const Page = () => {
  return <Usercreation />;
};

export default Page;
