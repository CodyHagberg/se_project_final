import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchBusinesses, regeneratePublishableKey, updateAllowedDomains, updateGeminiKey, updateMonthlyLeadLimit, updateOverageSettings, updateSeatLimit } from "../../utils/api";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import "./AdminBusinesses.css";

const PLAN_DISPLAY = {
  individual: "Individual",
  small_business: "Small Business",
  enterprise: "Enterprise",
  free: "Free",
  pro: "Pro",
};

function AdminBusinesses() {
  const navigate = useNavigate();
  const { setActingTenant } = useActingBusinessId();
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingDomains, setEditingDomains] = useState(null);
  const [domainInput, setDomainInput] = useState("");
  const [editingGemini, setEditingGemini] = useState(null);
  const [geminiInput, setGeminiInput] = useState("");
  const [actionMsg, setActionMsg] = useState("");

  useEffect(() => {
    loadBusinesses();
  }, []);

  const loadBusinesses = async () => {
    try {
      const data = await fetchBusinesses();
      setBusinesses(data.businesses);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyKey = (key) => {
    navigator.clipboard.writeText(key);
    setActionMsg("Key copied to clipboard");
    setTimeout(() => setActionMsg(""), 2000);
  };

  const handleRegenPubKey = async (userId) => {
    if (!window.confirm("Regenerate publishable key? Existing widget embeds will stop working until updated.")) return;
    try {
      const data = await regeneratePublishableKey(userId);
      setBusinesses((prev) =>
        prev.map((b) => (b.id === userId ? { ...b, publishableKey: data.publishableKey } : b))
      );
      setActionMsg("Publishable key regenerated");
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSaveGemini = async (userId) => {
    try {
      const data = await updateGeminiKey(userId, geminiInput);
      setBusinesses((prev) =>
        prev.map((b) => (b.id === userId ? { ...b, hasGeminiKey: data.hasGeminiKey } : b))
      );
      setEditingGemini(null);
      setGeminiInput("");
      setActionMsg("Gemini API key updated");
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLeadLimitChange = async (userId, value) => {
    try {
      const data = await updateMonthlyLeadLimit(userId, Number(value));
      setBusinesses((prev) =>
        prev.map((b) => (b.id === userId ? { ...b, monthlyLeadLimit: data.monthlyLeadLimit } : b))
      );
      setActionMsg("Monthly lead limit updated");
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOveragePriceChange = async (userId, dollars) => {
    try {
      const cents = Math.round(Number(dollars) * 100);
      const data = await updateOverageSettings(userId, { overagePriceCents: cents });
      setBusinesses((prev) =>
        prev.map((b) => (b.id === userId ? { ...b, overagePriceCents: data.overagePriceCents } : b))
      );
      setActionMsg("Overage price updated");
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleOverageToggle = async (userId, enabled) => {
    try {
      const data = await updateOverageSettings(userId, { overageEnabled: enabled });
      setBusinesses((prev) =>
        prev.map((b) => (b.id === userId ? { ...b, overageEnabled: data.overageEnabled } : b))
      );
      setActionMsg(`Overages ${data.overageEnabled ? "enabled" : "disabled"}`);
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSeatLimitChange = async (userId, value) => {
    try {
      const data = await updateSeatLimit(userId, Number(value));
      setBusinesses((prev) =>
        prev.map((b) =>
          b.id === userId
            ? { ...b, seatLimit: data.seatLimit, seatsUsed: data.seatsUsed ?? b.seatsUsed }
            : b
        )
      );
      setActionMsg("Seat limit updated");
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEditDomains = (biz) => {
    setEditingDomains(biz.id);
    setDomainInput((biz.allowedDomains || []).join(", "));
  };

  const openTenantDashboard = (biz) => {
    setActingTenant(biz.id, biz.companyName);
    navigate(`/dashboard/overview?businessId=${encodeURIComponent(biz.id)}`);
  };

  const handleSaveDomains = async (userId) => {
    try {
      const domains = domainInput
        .split(",")
        .map((d) => d.trim())
        .filter(Boolean);
      const data = await updateAllowedDomains(userId, domains);
      setBusinesses((prev) =>
        prev.map((b) => (b.id === userId ? { ...b, allowedDomains: data.allowedDomains } : b))
      );
      setEditingDomains(null);
      setActionMsg("Domains updated");
      setTimeout(() => setActionMsg(""), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="adminBiz__loading">Loading businesses...</p>;
  if (error) return <p className="adminBiz__error">{error}</p>;

  return (
    <div className="adminBiz">
      <h2 className="adminBiz__title">Onboarded Businesses</h2>
      {actionMsg && <p className="adminBiz__actionMsg">{actionMsg}</p>}

      {businesses.length === 0 ? (
        <p className="adminBiz__empty">No businesses onboarded yet.</p>
      ) : (
        <div className="adminBiz__cards">
          {businesses.map((biz) => (
            <div key={biz.id} className="adminBiz__card">
              <div className="adminBiz__cardHeader">
                <div className="adminBiz__cardTitleBlock">
                  <h3 className="adminBiz__company">{biz.companyName}</h3>
                  <span className="adminBiz__plan">{PLAN_DISPLAY[biz.plan] || biz.plan}</span>
                </div>
                <button
                  type="button"
                  className="adminBiz__tenantDashBtn"
                  onClick={() => openTenantDashboard(biz)}
                >
                  Open tenant dashboard
                </button>
              </div>

              <div className="adminBiz__leadLimitSection">
                <span className="adminBiz__keyLabel">Monthly Lead Limit</span>
                <select
                  className="adminBiz__leadLimitSelect"
                  value={biz.monthlyLeadLimit ?? 25}
                  onChange={(e) => handleLeadLimitChange(biz.id, e.target.value)}
                >
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                  <option value={250}>250</option>
                  <option value={500}>500</option>
                  <option value={1000}>1,000</option>
                  <option value={-1}>Unlimited</option>
                </select>
              </div>

              <div className="adminBiz__leadLimitSection">
                <span className="adminBiz__keyLabel">
                  Seats{" "}
                  <span style={{ fontWeight: 400, opacity: 0.75 }}>
                    ({biz.seatsUsed ?? "—"} used)
                  </span>
                </span>
                <select
                  className="adminBiz__leadLimitSelect"
                  value={biz.seatLimit ?? 1}
                  onChange={(e) => handleSeatLimitChange(biz.id, e.target.value)}
                >
                  <option value={1}>1</option>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                </select>
              </div>

              <div className="adminBiz__leadLimitSection">
                <span className="adminBiz__keyLabel">Overage Price</span>
                <select
                  className="adminBiz__leadLimitSelect"
                  value={((biz.overagePriceCents ?? 200) / 100).toFixed(2)}
                  onChange={(e) => handleOveragePriceChange(biz.id, e.target.value)}
                >
                  {Array.from({ length: 20 }, (_, i) => ((i + 1) * 0.1).toFixed(2)).map((val) => (
                    <option key={val} value={val}>
                      ${val} / lead
                    </option>
                  ))}
                </select>
              </div>

              <div className="adminBiz__leadLimitSection">
                <span className="adminBiz__keyLabel">Overages</span>
                <select
                  className="adminBiz__leadLimitSelect"
                  value={biz.overageEnabled ? "enabled" : "disabled"}
                  onChange={(e) => handleOverageToggle(biz.id, e.target.value === "enabled")}
                >
                  <option value="disabled">Disabled</option>
                  <option value="enabled">Enabled</option>
                </select>
              </div>

              <div className="adminBiz__meta">
                <span>{biz.email}</span>
                <span>{biz.leadCount} leads</span>
                <span>{new Date(biz.createdAt).toLocaleDateString()}</span>
              </div>

              <div className="adminBiz__keySection">
                <div className="adminBiz__keyRow">
                  <span className="adminBiz__keyLabel">Publishable Key</span>
                  <code className="adminBiz__keyValue">
                    {biz.publishableKey ? `${biz.publishableKey.slice(0, 24)}...` : "—"}
                  </code>
                  {biz.publishableKey && (
                    <button className="adminBiz__copyBtn" onClick={() => handleCopyKey(biz.publishableKey)}>
                      Copy
                    </button>
                  )}
                  <button className="adminBiz__regenBtn" onClick={() => handleRegenPubKey(biz.id)}>
                    Regenerate
                  </button>
                </div>
              </div>

              <div className="adminBiz__geminiSection">
                <span className="adminBiz__keyLabel">Gemini API Key</span>
                {editingGemini === biz.id ? (
                  <div className="adminBiz__domainEdit">
                    <input
                      type="password"
                      className="adminBiz__domainInput"
                      value={geminiInput}
                      onChange={(e) => setGeminiInput(e.target.value)}
                      placeholder="AIzaSy..."
                    />
                    <div className="adminBiz__domainActions">
                      <button className="adminBiz__saveBtn" onClick={() => handleSaveGemini(biz.id)}>
                        Save
                      </button>
                      <button className="adminBiz__cancelBtn" onClick={() => { setEditingGemini(null); setGeminiInput(""); }}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="adminBiz__domainDisplay">
                    <span className="adminBiz__domainList">
                      {biz.hasGeminiKey ? "Configured" : "Not set"}
                    </span>
                    <button className="adminBiz__editBtn" onClick={() => { setEditingGemini(biz.id); setGeminiInput(""); }}>
                      {biz.hasGeminiKey ? "Update" : "Add"}
                    </button>
                  </div>
                )}
              </div>

              <div className="adminBiz__domainSection">
                <span className="adminBiz__keyLabel">Allowed Domains</span>
                {editingDomains === biz.id ? (
                  <div className="adminBiz__domainEdit">
                    <input
                      type="text"
                      className="adminBiz__domainInput"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                      placeholder="acme.com, www.acme.com"
                    />
                    <div className="adminBiz__domainActions">
                      <button className="adminBiz__saveBtn" onClick={() => handleSaveDomains(biz.id)}>
                        Save
                      </button>
                      <button className="adminBiz__cancelBtn" onClick={() => setEditingDomains(null)}>
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="adminBiz__domainDisplay">
                    <span className="adminBiz__domainList">
                      {biz.allowedDomains?.length > 0
                        ? biz.allowedDomains.join(", ")
                        : "All origins (dev mode)"}
                    </span>
                    <button className="adminBiz__editBtn" onClick={() => handleEditDomains(biz)}>
                      Edit
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminBusinesses;
