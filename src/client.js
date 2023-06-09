import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_URL = "http://localhost:3000";
const client = new ApolloClient({
  uri: API_URL, // Remplacez par l'URL de votre serveur GraphQL
  cache: new InMemoryCache(),
});

export default client;
