import logoDark from "../assets/img/Movie explorer dark.png";
import logoLight from "../assets/img/Movie explorer light.png";
import { Link, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import LoggedUser from "./LoggedUser";
import SearchBox from "./SearchBox";
import "../assets/CSS/Navbar.css";
import { useSelector } from "react-redux";

function Navbar() {
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.theme.darkMode);

  return (
    <nav className={`navbar ${darkMode ? "dark" : "light"}`}>
      <div className="navbar-left" onClick={() => navigate("/")}>
        <img
          src={darkMode ? logoDark : logoLight}
          alt="Logo"
          className="logo-img"
        />
        <span className="navbar-title">Movie Explorer</span>
      </div>

      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>
      </ul>

      <div className="navbar-utilities">
        <SearchBox />
        <ThemeToggle />
        <LoggedUser />
      </div>
    </nav>
  );
}

export default Navbar;
