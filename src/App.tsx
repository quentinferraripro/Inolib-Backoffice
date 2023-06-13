import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./client";
import "./App.css";
import AllRoutes from "@components/AllRoutes";
// import { DashboardContextProvider } from "./context/DashboardContext";
import NavigationBar from "@components/NavBar";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <NavigationBar />
        <AllRoutes />
      </Router>
    </ApolloProvider>
  );
}

export default App;
