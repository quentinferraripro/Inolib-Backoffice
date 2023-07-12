import type { Metadata } from "next";
import type { PropsWithChildren } from "react";

import { App } from "@components/App";

import "./globals.css";

export const metadata: Metadata = {
  title: "",
  description: "",
};

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="fr">
      <body>
        <App>{children}</App>
      </body>
    </html>
  );
};

export default Layout;
