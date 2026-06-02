import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { register as registerApi } from "../../utils/api";
import "./Signup.css";

const PLAN_LABELS = {
  individual: "Individual — $25/month",
  small_business: "Small Business — $50/month",
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [tosAccepted, setTosAccepted] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const plan = new URLSearchParams(location.search).get("plan") || "individual";
  const planLabel = PLAN_LABELS[plan] || PLAN_LABELS.individual;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // No account is created here — the backend saves a temporary record and
      // returns a Stripe Checkout URL. The real account is only created after
      // Stripe confirms payment via webhook.
      const data = await registerApi(email, password, companyName, plan, {
        tosVersion: "1.0",
        privacyVersion: "1.0",
        aupVersion: "1.0",
        subprocessorsVersion: "1.0",
      });
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="signup">
      <form className="signup__form" onSubmit={handleSubmit}>
        <h2 className="signup__title">Create Your Account</h2>
        <p className="signup__plan">{planLabel}</p>

        {error && <p className="signup__error">{error}</p>}

        <label className="signup__label">
          Company Name
          <input
            type="text"
            className="signup__input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Acme Inc."
            required
          />
        </label>

        <label className="signup__label">
          Email
          <input
            type="email"
            className="signup__input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            required
          />
        </label>

        <label className="signup__label">
          Password
          <input
            type="password"
            className="signup__input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 8 characters"
            minLength={8}
            required
          />
        </label>

        <label className="signup__consent">
          <input
            type="checkbox"
            checked={tosAccepted}
            onChange={(e) => setTosAccepted(e.target.checked)}
          />
          I have read and agree to ALEI&rsquo;s{" "}
          <a href="/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a>
          {" "}and{" "}
          <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
        </label>

        <button type="submit" className="signup__button" disabled={isLoading || !tosAccepted}>
          {isLoading ? "Setting up your account..." : "Continue to Payment"}
        </button>

        <p className="signup__login">
          Already have an account? <Link to="/login" className="signup__loginLink">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
