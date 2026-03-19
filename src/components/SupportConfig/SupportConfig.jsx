import { useState, useEffect } from "react";
import { fetchSupportConfig, updateSupportConfig } from "../../utils/api";
import "../AIConfig/AIConfig.css";

function SupportConfig() {
  const [config, setConfig] = useState({
    assistantName: "",
    systemInstruction: "",
    companyInfo: "",
    greetingTemplate: "",
    maxMessages: 10,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await fetchSupportConfig();
      if (data.config) {
        setConfig({
          assistantName: data.config.assistantName || "",
          systemInstruction: data.config.systemInstruction || "",
          companyInfo: data.config.companyInfo || "",
          greetingTemplate: data.config.greetingTemplate || "",
          maxMessages: data.config.maxMessages || 10,
        });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");
    setError("");

    try {
      await updateSupportConfig(config);
      setMessage("Support configuration saved successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="aiConfig__loading">Loading configuration...</p>;

  return (
    <div className="aiConfig">
      <h2 className="aiConfig__title">Support Knowledge</h2>
      <p className="aiConfig__subtitle">
        Configure the AI that powers your customer support chat bubble — FAQs, help docs, and support tone.
      </p>

      {message && <p className="aiConfig__success">{message}</p>}
      {error && <p className="aiConfig__error">{error}</p>}

      <div className="aiConfig__field">
        <label className="aiConfig__label">Assistant Name</label>
        <input
          type="text"
          className="aiConfig__input"
          value={config.assistantName}
          onChange={(e) => setConfig({ ...config, assistantName: e.target.value })}
          placeholder="e.g., HelpBot, SupportAI"
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">Company / Product Info</label>
        <textarea
          className="aiConfig__textarea aiConfig__textarea--sm"
          value={config.companyInfo}
          onChange={(e) => setConfig({ ...config, companyInfo: e.target.value })}
          placeholder="Describe your product, services, and common support topics..."
          rows={4}
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">System Instruction</label>
        <textarea
          className="aiConfig__textarea"
          value={config.systemInstruction}
          onChange={(e) => setConfig({ ...config, systemInstruction: e.target.value })}
          placeholder="Define how the support AI should behave — tone, knowledge boundaries, escalation rules..."
          rows={16}
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">Greeting Template</label>
        <textarea
          className="aiConfig__textarea aiConfig__textarea--sm"
          value={config.greetingTemplate}
          onChange={(e) => setConfig({ ...config, greetingTemplate: e.target.value })}
          placeholder="e.g., Hi! I'm {{assistantName}}. How can I help you today?"
          rows={3}
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">Max Messages per Session</label>
        <input
          type="number"
          className="aiConfig__input aiConfig__input--sm"
          value={config.maxMessages}
          onChange={(e) => setConfig({ ...config, maxMessages: parseInt(e.target.value, 10) || 10 })}
          min={1}
          max={30}
        />
      </div>

      <button className="aiConfig__saveBtn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Configuration"}
      </button>
    </div>
  );
}

export default SupportConfig;
