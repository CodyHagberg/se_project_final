/**
 * Footer.jsx
 * Site footer (author and year). Rendered only on the home route, not on /demo.
 */
import "./Footer.css";

export default function Footer() {
    return (
    <footer className="footer">
    <div className="footer__content">
        <span className="footer__name">Developed by Cody Hagberg</span>
        <span className="footer__date">2026</span>
    </div>
    </footer>
    );
}