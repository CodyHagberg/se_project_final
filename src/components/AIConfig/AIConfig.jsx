import { useState, useEffect } from "react";
import { fetchConfig, updateConfig, fetchDefaultTemplate } from "../../utils/api";
import { useActingBusinessId } from "../../hooks/useActingBusinessId";
import "./AIConfig.css";

function AIConfig() {
  const { actingBusinessId } = useActingBusinessId();
  const [config, setConfig] = useState({
    assistantName: "",
    systemInstruction: "",
    companyInfo: "",
    greetingTemplate: "",
    maxMessages: 6,
    maxVoiceMinutes: 5,
    maxVoiceOverageMinutes: 6,
    chatModes: "both",
    idleTimeoutSeconds: 60,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadConfig();
  }, [actingBusinessId]);

  const loadConfig = async () => {
    try {
      const data = await fetchConfig(actingBusinessId || undefined);
      if (data.config) {
        setConfig({
          assistantName: data.config.assistantName || "",
          systemInstruction: data.config.systemInstruction || "",
          companyInfo: data.config.companyInfo || "",
          greetingTemplate: data.config.greetingTemplate || "",
          maxMessages: data.config.maxMessages || 6,
          maxVoiceMinutes: data.config.maxVoiceMinutes ?? 5,
          maxVoiceOverageMinutes: data.config.maxVoiceOverageMinutes ?? 6,
          chatModes: data.config.chatModes || "both",
          idleTimeoutSeconds: data.config.idleTimeoutSeconds ?? 60,
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
      await updateConfig(config, actingBusinessId || undefined);
      setMessage("Configuration saved successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleLoadTemplate = async () => {
    try {
      const data = await fetchDefaultTemplate(actingBusinessId || undefined);
      setConfig((prev) => ({ ...prev, systemInstruction: data.template }));
      setMessage("Template loaded -- customize it for your business");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="aiConfig__loading">Loading configuration...</p>;

  return (
    <div className="aiConfig">
      <h2 className="aiConfig__title">AI Sales Config</h2>
      <p className="aiConfig__subtitle">
        Customize how your AI sales assistant behaves with leads.
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
          placeholder="e.g., SalesBot, AcmeAI"
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">Company Info</label>
        <textarea
          className="aiConfig__textarea aiConfig__textarea--sm"
          value={config.companyInfo}
          onChange={(e) => setConfig({ ...config, companyInfo: e.target.value })}
          placeholder="Describe your company, products, and value proposition..."
          rows={4}
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">
          System Instruction
          <button type="button" className="aiConfig__templateBtn" onClick={handleLoadTemplate}>
            Load Template
          </button>
        </label>
        <textarea
          className="aiConfig__textarea"
          value={config.systemInstruction}
          onChange={(e) => setConfig({ ...config, systemInstruction: e.target.value })}
          placeholder="The full system instruction that controls your AI's behavior..."
          rows={16}
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">Greeting Template</label>
        <textarea
          className="aiConfig__textarea aiConfig__textarea--sm"
          value={config.greetingTemplate}
          onChange={(e) => setConfig({ ...config, greetingTemplate: e.target.value })}
          placeholder="Use {{userName}} and {{companyName}} as placeholders..."
          rows={3}
        />
      </div>

      <div className="aiConfig__field">
        <label className="aiConfig__label">Max Messages per Conversation</label>
        <input
          type="number"
          className="aiConfig__input aiConfig__input--sm"
          value={config.maxMessages}
          onChange={(e) => setConfig({ ...config, maxMessages: parseInt(e.target.value, 10) || 6 })}
          min={1}
          max={20}
        />
      </div>

      <hr className="aiConfig__divider" />
      <h3 className="aiConfig__sectionTitle">Voice &amp; Chat Limits</h3>

      <div className="aiConfig__row">
        <div className="aiConfig__field aiConfig__field--half">
          <label className="aiConfig__label">Max Voice Minutes</label>
          <input
            type="number"
            className="aiConfig__input aiConfig__input--sm"
            value={config.maxVoiceMinutes}
            onChange={(e) => setConfig({ ...config, maxVoiceMinutes: parseInt(e.target.value, 10) || 5 })}
            min={1}
            max={10}
          />
        </div>

        <div className="aiConfig__field aiConfig__field--half">
          <label className="aiConfig__label">Voice Overage Limit (minutes)</label>
          <input
            type="number"
            className="aiConfig__input aiConfig__input--sm"
            value={config.maxVoiceOverageMinutes}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10) || config.maxVoiceMinutes;
              setConfig({ ...config, maxVoiceOverageMinutes: Math.max(val, config.maxVoiceMinutes) });
            }}
            min={config.maxVoiceMinutes}
            max={15}
          />
        </div>
      </div>

      <div className="aiConfig__row">
        <div className="aiConfig__field aiConfig__field--half">
          <label className="aiConfig__label">Allowed Chat Modes</label>
          <select
            className="aiConfig__select"
            value={config.chatModes}
            onChange={(e) => setConfig({ ...config, chatModes: e.target.value })}
          >
            <option value="both">Both (Voice &amp; Text)</option>
            <option value="voice">Voice Only</option>
            <option value="text">Text Only</option>
          </select>
        </div>

        <div className="aiConfig__field aiConfig__field--half">
          <label className="aiConfig__label">Idle Timeout (seconds)</label>
          <input
            type="number"
            className="aiConfig__input aiConfig__input--sm"
            value={config.idleTimeoutSeconds}
            onChange={(e) => setConfig({ ...config, idleTimeoutSeconds: parseInt(e.target.value, 10) || 60 })}
            min={15}
            max={300}
          />
        </div>
      </div>

      <button className="aiConfig__saveBtn" onClick={handleSave} disabled={saving}>
        {saving ? "Saving..." : "Save Configuration"}
      </button>
    </div>
  );
}

export default AIConfig;
