"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { PropsWithChildren } from "react";

import NavigationBar from "@components/NavBar";

const client = new ApolloClient({
  uri: "http://localhost:3000",
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
