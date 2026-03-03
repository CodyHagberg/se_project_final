import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { changePassword as changePasswordApi } from "../../utils/api";
import "./ChangePassword.css";

function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, user, updateUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);

    try {
      const data = await changePasswordApi(currentPassword, newPassword);
      login(data.token, { ...user, mustChangePassword: false });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="changePassword">
      <form className="changePassword__form" onSubmit={handleSubmit}>
        <h2 className="changePassword__title">Change Password</h2>
        <p className="changePassword__subtitle">
          You must change your temporary password before continuing.
        </p>
        {error && <p className="changePassword__error">{error}</p>}
        <label className="changePassword__label">
          Current Password
          <input
            type="password"
            className="changePassword__input"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </label>
        <label className="changePassword__label">
          New Password
          <input
            type="password"
            className="changePassword__input"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <label className="changePassword__label">
          Confirm New Password
          <input
            type="password"
            className="changePassword__input"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="changePassword__button" disabled={isLoading}>
          {isLoading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
}

export default ChangePassword;
