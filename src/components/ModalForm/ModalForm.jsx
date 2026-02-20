/**
 * ModalForm.jsx
 * Lead capture form (name, email, company name). Validates on submit,
 * POSTs to /api/leads, then calls onSubmit(lead) on success so parent
 * can hide form and open chat. Inline on demo page (not a modal overlay).
 */
import { useState } from "react";
import "./ModalForm.css";

function ModalForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    companyName: ""
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  /** Client-side validation for required fields and email format */
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /** Submit: validate, POST to /api/leads, then call onSubmit(lead) or set errors */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === "Success") {
        onSubmit(data.lead);
      } else {
        setErrors({ submit: data.error || "Failed to submit form" });
        setIsSubmitting(false);
      }
    } catch (error) {
      setErrors({ submit: "Failed to connect to server. Please try again." });
      setIsSubmitting(false);
    }
  };

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
