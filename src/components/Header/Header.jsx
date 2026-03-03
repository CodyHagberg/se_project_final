import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Header.css";
import logo from "../../assets/header-logo.svg";
import backgroundImage from "../../assets/nav.svg";

function Header() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <header className="header">
      <h1 className="header-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="LEAI" />
      </h1>
      <div
        className="nav-oval-wrapper"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <nav className="nav">
          <a href="/#about" className="nav-link">About</a>
          <a href="/#solutions" className="nav-link">Solutions</a>
          <a href="/#pricing" className="nav-link">Pricing</a>
          <a href="/#faq" className="nav-link">FAQ</a>
        </nav>
      </div>
      <div className="header__actions">
        <button className="demoButton" onClick={() => navigate("/demo")}>
          Demo
        </button>
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