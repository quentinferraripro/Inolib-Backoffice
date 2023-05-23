import { BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import AllRoutes from "@components/AllRoutes";

function App() {
  return (
    <Router>
      <AllRoutes />
    </Router>
  );
}

export default App;
