"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { PropsWithChildren } from "react";

import NavigationBar from "@components/NavBar";

const client = new ApolloClient({
  uri: "https://api-back-end-inolib.vercel.app",
  cache: new InMemoryCache(),
});

export const App = ({ children }: PropsWithChildren) => {
  return (
    <ApolloProvider client={client}>
      <NavigationBar />
      <main>{children}</main>
    </ApolloProvider>
  );
};
