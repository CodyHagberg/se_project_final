import { useState } from "react";
import { createBusiness } from "../../utils/api";
import "./AdminOnboard.css";

function AdminOnboard() {
  const [form, setForm] = useState({ email: "", companyName: "", tempPassword: "", plan: "free" });
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    setIsLoading(true);

    try {
      const data = await createBusiness(form);
      setResult(data.business);
      setForm({ email: "", companyName: "", tempPassword: "", plan: "free" });
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="adminOnboard">
      <h2 className="adminOnboard__title">Onboard New Business</h2>
      <p className="adminOnboard__subtitle">
        Create a business account. The owner will log in with the temp password and be asked to change it.
      </p>

      {error && <p className="adminOnboard__error">{error}</p>}

      {result && (
        <div className="adminOnboard__success">
          <p><strong>Account created for {result.companyName}</strong></p>
          <p>Email: {result.email}</p>
          <p>Plan: {result.plan}</p>
          <p>API Key: <code>{result.apiKey}</code></p>
        </div>
      )}

      <form className="adminOnboard__form" onSubmit={handleSubmit}>
        <label className="adminOnboard__label">
          Business Email
          <input
            type="email"
            className="adminOnboard__input"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </label>
        <label className="adminOnboard__label">
          Company Name
          <input
            type="text"
            className="adminOnboard__input"
            value={form.companyName}
            onChange={(e) => setForm({ ...form, companyName: e.target.value })}
            required
          />
        </label>
        <label className="adminOnboard__label">
          Temporary Password
          <input
            type="text"
            className="adminOnboard__input"
            value={form.tempPassword}
            onChange={(e) => setForm({ ...form, tempPassword: e.target.value })}
            required
          />
        </label>
        <label className="adminOnboard__label">
          Plan
          <select
            className="adminOnboard__input"
            value={form.plan}
            onChange={(e) => setForm({ ...form, plan: e.target.value })}
          >
            <option value="free">Free</option>
            <option value="pro">Pro</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </label>
        <button type="submit" className="adminOnboard__button" disabled={isLoading}>
          {isLoading ? "Creating..." : "Create Business Account"}
        </button>
      </form>
    </div>
  );
}

export default AdminOnboard;
