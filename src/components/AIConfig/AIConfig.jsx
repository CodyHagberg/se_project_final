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
    visualContentSets: [],
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
        const systemInstruction = data.config.systemInstruction || "";
        const greetingTemplate = data.config.greetingTemplate || "";

        setConfig({
          assistantName: data.config.assistantName || "",
          systemInstruction,
          companyInfo: data.config.companyInfo || "",
          greetingTemplate,
          maxMessages: data.config.maxMessages || 6,
          maxVoiceMinutes: data.config.maxVoiceMinutes ?? 5,
          maxVoiceOverageMinutes: data.config.maxVoiceOverageMinutes ?? 6,
          chatModes: data.config.chatModes || "both",
          idleTimeoutSeconds: data.config.idleTimeoutSeconds ?? 60,
          visualContentSets: data.config.visualContentSets || [],
        });

        // Auto-load the template for brand-new accounts that haven't configured
        // their assistant yet so they have a starting point immediately.
        if (!systemInstruction) {
          try {
            const tpl = await fetchDefaultTemplate(actingBusinessId || undefined);
            setConfig((prev) => ({
              ...prev,
              systemInstruction: tpl.template,
              ...(tpl.greetingTemplate && !greetingTemplate
                ? { greetingTemplate: tpl.greetingTemplate }
                : {}),
            }));
            setMessage("We loaded a starter template for you — fill in your company details in the ABOUT THE BUSINESS section and remove the SETUP GUIDE before going live.");
          } catch {
            // Non-fatal: user can still click Load Template manually.
          }
        }
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
      setConfig((prev) => ({
        ...prev,
        systemInstruction: data.template,
        ...(data.greetingTemplate ? { greetingTemplate: data.greetingTemplate } : {}),
      }));
      setMessage("Template loaded — customize the ABOUT THE BUSINESS section and remove the SETUP GUIDE before going live.");
    } catch (err) {
      setError(err.message);
    }
  };

  const addContentSet = () => {
    setConfig((prev) => ({
      ...prev,
      visualContentSets: [
        ...prev.visualContentSets,
        { name: "", triggerHint: "", items: [] },
      ],
    }));
  };

  const removeContentSet = (sIdx) => {
    setConfig((prev) => ({
      ...prev,
      visualContentSets: prev.visualContentSets.filter((_, i) => i !== sIdx),
    }));
  };

  const updateContentSet = (sIdx, field, value) => {
    setConfig((prev) => ({
      ...prev,
      visualContentSets: prev.visualContentSets.map((s, i) =>
        i === sIdx ? { ...s, [field]: value } : s
      ),
    }));
  };

  const addContentItem = (sIdx) => {
    setConfig((prev) => ({
      ...prev,
      visualContentSets: prev.visualContentSets.map((s, i) =>
        i === sIdx
          ? { ...s, items: [...s.items, { title: "", description: "", imageUrl: "", price: "" }] }
          : s
      ),
    }));
  };

  const removeContentItem = (sIdx, iIdx) => {
    setConfig((prev) => ({
      ...prev,
      visualContentSets: prev.visualContentSets.map((s, i) =>
        i === sIdx ? { ...s, items: s.items.filter((_, j) => j !== iIdx) } : s
      ),
    }));
  };

  const updateContentItem = (sIdx, iIdx, field, value) => {
    setConfig((prev) => ({
      ...prev,
      visualContentSets: prev.visualContentSets.map((s, i) =>
        i === sIdx
          ? {
              ...s,
              items: s.items.map((item, j) =>
                j === iIdx ? { ...item, [field]: value } : item
              ),
            }
          : s
      ),
    }));
  };

  if (loading) return <p className="aiConfig__loading">Loading configuration...</p>;

  return (
    <div className="aiConfig">
      <h2 className="aiConfig__title">AI Sales Config</h2>
      <p className="aiConfig__subtitle">
        Customize how your AI sales assistant behaves with leads.
      </p>

      {saving && (
        <div className="aiConfig__savingStatus" role="status" aria-live="polite">
          <div className="aiConfig__savingTrack" aria-hidden>
            <div className="aiConfig__savingIndicator" />
          </div>
          <div className="aiConfig__savingRow">
            <span className="aiConfig__savingSpinner" aria-hidden />
            <span className="aiConfig__savingText">Saving your configuration…</span>
          </div>
        </div>
      )}

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
          placeholder="Give your assistant the knowledge it needs about your business:
• What you do and what you offer
• Who your ideal customer is
• What makes you different from competitors
• Key details like pricing, service areas, or hours

This is your AI's source of truth — the more specific you are, the better it performs."
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

      <hr className="aiConfig__divider" />
      <h3 className="aiConfig__sectionTitle">Visual Content Sets</h3>
      <p className="aiConfig__sectionDesc">
        Define image/card collections that the AI can display inline during a conversation.
        Each set needs a trigger hint so the AI knows when to show it.
      </p>

      {config.visualContentSets.map((set, sIdx) => (
        <div key={set._id || sIdx} className="aiConfig__contentSet">
          <div className="aiConfig__contentSetHeader">
            <span className="aiConfig__contentSetLabel">
              Set {sIdx + 1}{set.name ? `: ${set.name}` : ""}
            </span>
            <button
              type="button"
              className="aiConfig__removeBtn"
              onClick={() => removeContentSet(sIdx)}
            >
              Remove Set
            </button>
          </div>

          <div className="aiConfig__field">
            <label className="aiConfig__label">Set Name</label>
            <input
              type="text"
              className="aiConfig__input"
              value={set.name}
              onChange={(e) => updateContentSet(sIdx, "name", e.target.value)}
              placeholder="e.g., Lunch Menu, Product Gallery"
            />
          </div>

          <div className="aiConfig__field">
            <label className="aiConfig__label">Trigger Hint</label>
            <input
              type="text"
              className="aiConfig__input"
              value={set.triggerHint}
              onChange={(e) => updateContentSet(sIdx, "triggerHint", e.target.value)}
              placeholder="e.g., When the customer asks about the menu"
            />
          </div>

          <div className="aiConfig__contentItems">
            <label className="aiConfig__label">Items</label>
            {set.items.map((item, iIdx) => (
              <div key={item._id || iIdx} className="aiConfig__contentItem">
                <div className="aiConfig__row">
                  <div className="aiConfig__field aiConfig__field--half">
                    <input
                      type="text"
                      className="aiConfig__input"
                      value={item.title}
                      onChange={(e) => updateContentItem(sIdx, iIdx, "title", e.target.value)}
                      placeholder="Title"
                    />
                  </div>
                  <div className="aiConfig__field aiConfig__field--half">
                    <input
                      type="text"
                      className="aiConfig__input"
                      value={item.price}
                      onChange={(e) => updateContentItem(sIdx, iIdx, "price", e.target.value)}
                      placeholder="Price (optional)"
                    />
                  </div>
                </div>
                <div className="aiConfig__field">
                  <input
                    type="text"
                    className="aiConfig__input"
                    value={item.imageUrl}
                    onChange={(e) => updateContentItem(sIdx, iIdx, "imageUrl", e.target.value)}
                    placeholder="Image URL (Google Drive share link or direct URL)"
                  />
                </div>
                <div className="aiConfig__field">
                  <input
                    type="text"
                    className="aiConfig__input"
                    value={item.description}
                    onChange={(e) => updateContentItem(sIdx, iIdx, "description", e.target.value)}
                    placeholder="Description (optional)"
                  />
                </div>
                <button
                  type="button"
                  className="aiConfig__removeBtn aiConfig__removeBtn--sm"
                  onClick={() => removeContentItem(sIdx, iIdx)}
                >
                  Remove Item
                </button>
              </div>
            ))}
            <button
              type="button"
              className="aiConfig__addBtn"
              onClick={() => addContentItem(sIdx)}
            >
              + Add Item
            </button>
          </div>
        </div>
      ))}

      <button type="button" className="aiConfig__addBtn" onClick={addContentSet}>
        + Add Content Set
      </button>

      <div style={{ marginTop: 24 }}>
        <button className="aiConfig__saveBtn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </div>
    </div>
  );
}

export default AIConfig;
