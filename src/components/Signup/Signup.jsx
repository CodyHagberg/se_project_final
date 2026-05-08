import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../contexts/useAuth";
import { register as registerApi, startCheckout } from "../../utils/api";
import "./Signup.css";

const PLAN_LABELS = {
  individual: "Individual — $25/month",
  small_business: "Small Business — $50/month",
};

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const plan = new URLSearchParams(location.search).get("plan") || "individual";
  const planLabel = PLAN_LABELS[plan] || PLAN_LABELS.individual;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Create the account and auto-login.
      const data = await registerApi(email, password, companyName, plan);
      login(data.token, data.user);

      // Immediately redirect to Stripe Checkout for the selected plan.
      const { url } = await startCheckout(plan);
      window.location.href = url;
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

        <button type="submit" className="signup__button" disabled={isLoading}>
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
