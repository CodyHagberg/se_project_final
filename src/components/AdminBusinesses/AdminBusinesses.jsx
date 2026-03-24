import { useState, useEffect } from "react";
import { fetchBusinesses, regeneratePublishableKey, updateAllowedDomains, updateGeminiKey } from "../../utils/api";
import "./AdminBusinesses.css";

function AdminBusinesses() {
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

  const handleEditDomains = (biz) => {
    setEditingDomains(biz.id);
    setDomainInput((biz.allowedDomains || []).join(", "));
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
                <h3 className="adminBiz__company">{biz.companyName}</h3>
                <span className="adminBiz__plan">{biz.plan}</span>
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
