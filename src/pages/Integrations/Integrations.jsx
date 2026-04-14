import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchSalesforceStatus, disconnectSalesforce } from "../../utils/api";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import { BASE_URL } from "../../utils/constants";
import "./Integrations.css";

function Integrations() {
  const { actingBusinessId } = useActingBusinessId();
  const [connected, setConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [disconnecting, setDisconnecting] = useState(false);
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (searchParams.get("connected") === "true") {
      setToast("Salesforce connected successfully!");
      setSearchParams({}, { replace: true });
    }
    if (searchParams.get("error")) {
      setError(`Connection failed: ${searchParams.get("error")}`);
      setSearchParams({}, { replace: true });
    }
  }, [searchParams, setSearchParams]);

  useEffect(() => {
    setLoading(true);
    loadStatus();
  }, [actingBusinessId]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  const loadStatus = async () => {
    try {
      const data = await fetchSalesforceStatus(actingBusinessId || undefined);
      setConnected(data.salesforceConnected);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConnect = () => {
    const token = localStorage.getItem("token");
    const bid = actingBusinessId ? `&businessId=${encodeURIComponent(actingBusinessId)}` : "";
    window.location.href = `${BASE_URL}/api/integrations/salesforce/connect?token=${encodeURIComponent(token)}${bid}`;
  };

  const handleDisconnect = async () => {
    setDisconnecting(true);
    try {
      await disconnectSalesforce(actingBusinessId || undefined);
      setConnected(false);
      setToast("Salesforce disconnected.");
    } catch (err) {
      setError(err.message);
    } finally {
      setDisconnecting(false);
    }
  };

  if (loading) return <p className="integrations__loading">Loading...</p>;

  return (
    <div className="integrations">
      <h2 className="integrations__title">Integrations</h2>
      <p className="integrations__subtitle">
        Connect third-party services to automatically sync your leads.
      </p>

      {toast && <div className="integrations__toast">{toast}</div>}
      {error && <div className="integrations__error">{error}</div>}

      <div className="integrations__card">
        <div className="integrations__cardHeader">
          <div className="integrations__cardLogo">
            <svg viewBox="0 0 50 50" width="40" height="40" xmlns="http://www.w3.org/2000/svg">
              <circle cx="25" cy="25" r="25" fill="#00A1E0" />
              <text x="25" y="30" textAnchor="middle" fill="#fff" fontSize="14" fontWeight="bold" fontFamily="Arial, sans-serif">SF</text>
            </svg>
          </div>
          <div className="integrations__cardInfo">
            <h3 className="integrations__cardName">Salesforce</h3>
            <span className={`integrations__badge ${connected ? "integrations__badge--connected" : ""}`}>
              {connected ? "Connected" : "Not Connected"}
            </span>
          </div>
        </div>

        <p className="integrations__cardDesc">
          Automatically create leads in your Salesforce CRM when a visitor completes
          an AI conversation through your ALEI widget.
        </p>

        <div className="integrations__cardActions">
          {connected ? (
            <button
              className="integrations__disconnectBtn"
              onClick={handleDisconnect}
              disabled={disconnecting}
            >
              {disconnecting ? "Disconnecting..." : "Disconnect"}
            </button>
          ) : (
            <button className="integrations__connectBtn" onClick={handleConnect}>
              Connect Salesforce
            </button>
          )}
        </div>
      </div>

      <div className="integrations__instructions">
        <h3>How it works</h3>
        <ol>
          <li>Click <strong>Connect Salesforce</strong> above</li>
          <li>Log in with your Salesforce credentials</li>
          <li>Approve ALEI access to your Salesforce organization</li>
          <li>You&apos;ll be redirected back here automatically</li>
          <li>
            From now on, every completed lead conversation will create a new lead
            in your Salesforce with the full AI transcript in the Description field
          </li>
        </ol>
      </div>
    </div>
  );
}

export default Integrations;
