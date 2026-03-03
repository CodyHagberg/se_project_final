import { useState, useEffect } from "react";
import { fetchWidgetSnippet } from "../../utils/api";
import "./WidgetSetup.css";

function WidgetSetup() {
  const [snippet, setSnippet] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSnippet();
  }, []);

  const loadSnippet = async () => {
    try {
      const data = await fetchWidgetSnippet();
      setSnippet(data.snippet);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setError("Failed to copy to clipboard");
    }
  };

  if (loading) return <p className="widgetSetup__loading">Loading...</p>;

  return (
    <div className="widgetSetup">
      <h2 className="widgetSetup__title">Widget Setup</h2>
      <p className="widgetSetup__subtitle">
        Add this snippet to your website to embed the LEAI chat widget. Paste it
        just before the closing <code>&lt;/body&gt;</code> tag.
      </p>

      {error && <p className="widgetSetup__error">{error}</p>}

      <div className="widgetSetup__snippetBox">
        <code className="widgetSetup__code">{snippet}</code>
        <button className="widgetSetup__copyBtn" onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div className="widgetSetup__instructions">
        <h3>How it works</h3>
        <ol>
          <li>Copy the snippet above</li>
          <li>Paste it into your website HTML before the closing <code>&lt;/body&gt;</code> tag</li>
          <li>Visitors will see a chat button on your site</li>
          <li>Leads and conversations will appear in your Leads dashboard</li>
        </ol>
      </div>
    </div>
  );
}

export default WidgetSetup;
