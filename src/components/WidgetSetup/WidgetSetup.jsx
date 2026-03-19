import { useState, useEffect } from "react";
import { fetchWidgetSnippet } from "../../utils/api";
import "./WidgetSetup.css";

function WidgetSetup() {
  const [salesSnippet, setSalesSnippet] = useState("");
  const [supportSnippet, setSupportSnippet] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(null);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("sales");

  useEffect(() => {
    loadSnippets();
  }, []);

  const loadSnippets = async () => {
    try {
      const data = await fetchWidgetSnippet();
      setSalesSnippet(data.snippet);
      setSupportSnippet(data.supportSnippet || "");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(label);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  if (loading) return <p className="widgetSetup__loading">Loading...</p>;

  const snippet = activeTab === "sales" ? salesSnippet : supportSnippet;
  const description = activeTab === "sales"
    ? "Embed the LEAI sales chat widget on your website. This uses your Sales AI Config to qualify leads."
    : "Embed the LEAI support chat bubble on your website. This uses your Support Knowledge config for FAQs and customer help.";

  return (
    <div className="widgetSetup">
      <h2 className="widgetSetup__title">Widget Setup</h2>
      <p className="widgetSetup__subtitle">{description}</p>

      <div className="widgetSetup__tabs">
        <button
          className={`widgetSetup__tab ${activeTab === "sales" ? "widgetSetup__tab--active" : ""}`}
          onClick={() => setActiveTab("sales")}
        >
          Sales Widget
        </button>
        <button
          className={`widgetSetup__tab ${activeTab === "support" ? "widgetSetup__tab--active" : ""}`}
          onClick={() => setActiveTab("support")}
        >
          Support Widget
        </button>
      </div>

      {error && <p className="widgetSetup__error">{error}</p>}

      <div className="widgetSetup__snippetBox">
        <code className="widgetSetup__code">{snippet}</code>
        <button
          className="widgetSetup__copyBtn"
          onClick={() => handleCopy(snippet, activeTab)}
        >
          {copied === activeTab ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="widgetSetup__instructions">
        <h3>How it works</h3>
        <ol>
          <li>Copy the snippet above</li>
          <li>
            Paste it into your website HTML before the closing{" "}
            <code>&lt;/body&gt;</code> tag
          </li>
          <li>
            {activeTab === "sales"
              ? "Visitors will see a chat button to start a sales conversation"
              : "Visitors will see a support bubble in the bottom-right corner"}
          </li>
          <li>
            {activeTab === "sales"
              ? "Leads and conversations will appear in your Leads dashboard"
              : "Support conversations use your Support Knowledge configuration"}
          </li>
        </ol>
      </div>
    </div>
  );
}

export default WidgetSetup;
