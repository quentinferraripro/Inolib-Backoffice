import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import AllRoutes from "@components/AllRoutes";
import NavigationBar from "@components/NavBar";

function App() {
  return (
    <Router>
      <NavigationBar />
      <AllRoutes />
    </Router>
  );
}

export default App;
