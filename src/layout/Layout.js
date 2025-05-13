import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Layout.css";

import Navbar from "../components/Navbar";

function Layout() {
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <div className={`layout ${darkMode ? "dark" : "light"}`}>
      <Navbar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
