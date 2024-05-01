import { BrowserRouter as Router } from "react-router-dom";
import "./../index.css";
import Navbar from "./navbar.tsx";
import AppRoutes from "./routes.tsx";

function Routing() {
  return (
    <Router>
      <div key="app-root">
        <Navbar></Navbar>
        <AppRoutes></AppRoutes>
      </div>
    </Router>
  );
}

export default Routing;
