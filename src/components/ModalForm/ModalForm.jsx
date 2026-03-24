import { useState } from "react";
import { createLead } from "../../utils/api";
import "./ModalForm.css";

const CORE_KEYS = ["name", "email", "companyName"];

function ModalForm({ onSubmit, apiKey, widgetConfig }) {
  const activeFields = widgetConfig?.fields?.filter((f) => f.enabled) || null;

  const [formData, setFormData] = useState(() => {
    if (activeFields) {
      const initial = {};
      activeFields.forEach((f) => { initial[f.key] = ""; });
      return initial;
    }
    return { name: "", email: "", companyName: "" };
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (activeFields) {
      activeFields.forEach((field) => {
        const val = (formData[field.key] || "").trim();
        if (field.required && !val) {
          newErrors[field.key] = `${field.label.replace(/\s*\*\s*$/, "")} is required`;
        }
        if (field.type === "email" && val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
          newErrors[field.key] = "Invalid email format";
        }
      });
    } else {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = "Invalid email format";
      }
      if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const payload = { name: formData.name || "", email: formData.email || "", companyName: formData.companyName || "" };

      if (activeFields) {
        const customFields = {};
        activeFields.forEach((f) => {
          if (!CORE_KEYS.includes(f.key) && formData[f.key]) {
            customFields[f.key] = formData[f.key];
          }
        });
        if (Object.keys(customFields).length) payload.customFields = customFields;
      }

      const data = await createLead(payload, apiKey);
      onSubmit(data.lead);
    } catch (error) {
      setErrors({ submit: error.message || "Failed to connect to server. Please try again." });
      setIsSubmitting(false);
    }
  };

  const formTitle = widgetConfig?.formTitle || "Get Started";
  const submitText = widgetConfig?.submitButtonText || "Submit";

  // Dynamic rendering when widgetConfig is provided
  if (activeFields) {
    return (
      <div className="modalForm">
        <h2 className="modalFormTitle">{formTitle}</h2>
        <form className="modalFormContent" onSubmit={handleSubmit}>
          {activeFields.map((field) => (
            <div key={field.key} className="modalFormField">
              <label htmlFor={field.key} className="modalFormLabel">
                {field.label}
              </label>
              {field.type === "select" ? (
                <select
                  id={field.key}
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleChange}
                  className={`modalFormInput ${errors[field.key] ? "modalFormInputError" : ""}`}
                  disabled={isSubmitting}
                >
                  <option value="">{field.placeholder || "Select..."}</option>
                  {(field.options || []).map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type || "text"}
                  id={field.key}
                  name={field.key}
                  value={formData[field.key] || ""}
                  onChange={handleChange}
                  className={`modalFormInput ${errors[field.key] ? "modalFormInputError" : ""}`}
                  placeholder={field.placeholder}
                  disabled={isSubmitting}
                />
              )}
              {errors[field.key] && (
                <span className="modalFormError">{errors[field.key]}</span>
              )}
            </div>
          ))}

          {errors.submit && (
            <div className="modalFormError modalFormSubmitError">{errors.submit}</div>
          )}

          <button type="submit" className="modalFormSubmitButton" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : submitText}
          </button>
        </form>
      </div>
    );
  }

  // Default hardcoded form (demo / no widgetConfig)
  return (
    <div className="modalForm">
      <h2 className="modalFormTitle">Get Started</h2>
      <form className="modalFormContent" onSubmit={handleSubmit}>
          <div className="modalFormField">
            <label htmlFor="name" className="modalFormLabel">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`modalFormInput ${errors.name ? "modalFormInputError" : ""}`}
              placeholder="Enter your name"
              disabled={isSubmitting}
            />
            {errors.name && (
              <span className="modalFormError">{errors.name}</span>
            )}
          </div>

          <div className="modalFormField">
            <label htmlFor="email" className="modalFormLabel">
              Email *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`modalFormInput ${errors.email ? "modalFormInputError" : ""}`}
              placeholder="Enter your email"
              disabled={isSubmitting}
            />
            {errors.email && (
              <span className="modalFormError">{errors.email}</span>
            )}
          </div>

          <div className="modalFormField">
            <label htmlFor="companyName" className="modalFormLabel">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              className={`modalFormInput ${errors.companyName ? "modalFormInputError" : ""}`}
              placeholder="Enter your company name"
              disabled={isSubmitting}
            />
            {errors.companyName && (
              <span className="modalFormError">{errors.companyName}</span>
            )}
          </div>

          {errors.submit && (
            <div className="modalFormError modalFormSubmitError">
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className="modalFormSubmitButton"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
    </div>
  );
}

export default ModalForm;
