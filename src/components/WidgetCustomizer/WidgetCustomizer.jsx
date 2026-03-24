import { useState, useEffect } from "react";
import { fetchConfig, updateConfig } from "../../utils/api";
import { FIELD_CATALOG } from "../../utils/fieldCatalog";
import "./WidgetCustomizer.css";

const DEFAULT_FIELDS = [
  { key: "name", label: "Name *", placeholder: "Enter your name", type: "text", required: true, enabled: true, options: [] },
  { key: "email", label: "Email *", placeholder: "Enter your email", type: "email", required: true, enabled: true, options: [] },
  { key: "companyName", label: "Company Name *", placeholder: "Enter your company name", type: "text", required: true, enabled: true, options: [] },
];

const CORE_KEYS = ["name", "email"];

function WidgetCustomizer() {
  const [formTitle, setFormTitle] = useState("Get Started");
  const [submitButtonText, setSubmitButtonText] = useState("Submit");
  const [fields, setFields] = useState(DEFAULT_FIELDS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    loadConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const data = await fetchConfig();
      if (data.config?.widgetConfig) {
        const wc = data.config.widgetConfig;
        setFormTitle(wc.formTitle || "Get Started");
        setSubmitButtonText(wc.submitButtonText || "Submit");
        if (wc.fields?.length) setFields(wc.fields);
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
      await updateConfig({ widgetConfig: { formTitle, submitButtonText, fields } });
      setMessage("Widget configuration saved successfully");
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const updateField = (index, key, value) => {
    setFields((prev) => prev.map((f, i) => (i === index ? { ...f, [key]: value } : f)));
  };

  const activeKeys = fields.map((f) => f.key);
  const availableCatalogFields = FIELD_CATALOG.filter((cf) => !activeKeys.includes(cf.key));

  const addCatalogField = (catalogKey) => {
    const template = FIELD_CATALOG.find((f) => f.key === catalogKey);
    if (!template) return;
    setFields((prev) => [
      ...prev,
      { ...template, enabled: true },
    ]);
  };

  const removeField = (index) => {
    const field = fields[index];
    if (CORE_KEYS.includes(field.key)) return;
    setFields((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) return <p className="wc__loading">Loading...</p>;

  return (
    <div className="wc">
      <div className="wc__editor">
        <h2 className="wc__title">Widget Customizer</h2>
        <p className="wc__subtitle">
          Customize the lead capture form that appears in your embedded widget.
        </p>

        {message && <p className="wc__success">{message}</p>}
        {error && <p className="wc__error">{error}</p>}

        <div className="wc__field">
          <label className="wc__label">Form Title</label>
          <input
            type="text"
            className="wc__input"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            placeholder="Get Started"
          />
        </div>

        <div className="wc__field">
          <label className="wc__label">Submit Button Text</label>
          <input
            type="text"
            className="wc__input"
            value={submitButtonText}
            onChange={(e) => setSubmitButtonText(e.target.value)}
            placeholder="Submit"
          />
        </div>

        <div className="wc__section">
          <div className="wc__sectionHeader">
            <label className="wc__label">Form Fields</label>
            {availableCatalogFields.length > 0 && (
              <select
                className="wc__addSelect"
                value=""
                onChange={(e) => {
                  if (e.target.value) addCatalogField(e.target.value);
                }}
              >
                <option value="">+ Add Field</option>
                {availableCatalogFields.map((cf) => (
                  <option key={cf.key} value={cf.key}>{cf.label}</option>
                ))}
              </select>
            )}
          </div>

          <div className="wc__fieldsList">
            {fields.map((field, index) => {
              const isCore = CORE_KEYS.includes(field.key);
              return (
                <div key={field.key} className="wc__fieldRow">
                  <div className="wc__fieldRowTop">
                    <span className="wc__fieldName">{field.label}</span>
                    <span className="wc__fieldType">{field.type}</span>
                  </div>
                  <div className="wc__fieldRowBottom">
                    <label className="wc__toggle">
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => updateField(index, "required", e.target.checked)}
                        disabled={isCore}
                      />
                      Required
                    </label>
                    <label className="wc__toggle">
                      <input
                        type="checkbox"
                        checked={field.enabled}
                        onChange={(e) => updateField(index, "enabled", e.target.checked)}
                        disabled={isCore}
                      />
                      Enabled
                    </label>
                    {!isCore && (
                      <button
                        type="button"
                        className="wc__removeBtn"
                        onClick={() => removeField(index)}
                      >
                        Remove
                      </button>
                    )}
                    {isCore && <span className="wc__coreBadge">Required field</span>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button className="wc__saveBtn" onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Configuration"}
        </button>
      </div>

      <div className="wc__preview">
        <h3 className="wc__previewTitle">Live Preview</h3>
        <div className="wc__previewCard">
          <h2 className="wc__previewFormTitle">{formTitle || "Get Started"}</h2>
          <div className="wc__previewForm">
            {fields.filter((f) => f.enabled).map((field) => (
              <div key={field.key} className="wc__previewField">
                <label className="wc__previewLabel">{field.label}</label>
                {field.type === "select" ? (
                  <select className="wc__previewInput" disabled>
                    <option>{field.placeholder || "Select..."}</option>
                    {(field.options || []).map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={field.type}
                    className="wc__previewInput"
                    placeholder={field.placeholder}
                    disabled
                  />
                )}
              </div>
            ))}
            <button className="wc__previewSubmit" disabled>
              {submitButtonText || "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WidgetCustomizer;
