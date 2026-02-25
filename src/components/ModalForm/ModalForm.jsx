import { useState } from "react";
import { createLead } from "../../utils/api";
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
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: ""
      }));
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const data = await createLead(formData);
      onSubmit(data.lead);
    } catch (error) {
      setErrors({ submit: error.message || "Failed to connect to server. Please try again." });
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
