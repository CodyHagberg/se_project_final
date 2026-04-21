import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import "./Header.css";
import logo from "../../assets/ALEI_Logo.svg";
import backgroundImage from "../../assets/nav.svg";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="header">
      <h1 className="header-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="ALEI" />
      </h1>
      <div
        className="nav-oval-wrapper"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <nav className="nav">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `nav-link${isActive ? " nav-link--active" : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/solutions"
            className={({ isActive }) =>
              `nav-link${isActive ? " nav-link--active" : ""}`
            }
          >
            Solutions
          </NavLink>
          <Link to="/#pricing" className="nav-link">
            Pricing
          </Link>
          <Link to="/#faq" className="nav-link">
            FAQ
          </Link>
        </nav>
      </div>
      <div className="header__actions">
        <button
          className="demoButton header__loginBtn"
          onClick={() => navigate(user ? "/dashboard" : "/login")}
        >
          {user ? "Dashboard" : "Login"}
        </button>
      </div>
    </header>
  );
}

export default Header;