import "./Footer.css";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
    <footer className="footer">
    <div className="footer__content">
        <span className="footer__name">© ALEI 2026</span>
        <nav className="footer__links" aria-label="Legal links">
          <Link className="footer__link" to="/terms-of-service">Terms of Service</Link>
          <Link className="footer__link" to="/privacy">Privacy Policy</Link>
        </nav>
    </div>
    </footer>
    );
}