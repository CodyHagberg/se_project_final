import { useNavigate } from "react-router-dom";
import "./WelcomeModal.css";

export default function WelcomeModal({ userId, onClose }) {
  const navigate = useNavigate();

  const dismiss = () => {
    localStorage.setItem(`leai_welcomed_${userId}`, "1");
    onClose();
  };

  const goToConfig = () => {
    localStorage.setItem(`leai_welcomed_${userId}`, "1");
    onClose();
    navigate("/dashboard/ai-config");
  };

  return (
    <div className="welcomeModal__overlay" role="dialog" aria-modal="true" aria-labelledby="welcomeModal__title">
      <div className="welcomeModal__card">
        <div className="welcomeModal__icon" aria-hidden="true">✦</div>
        <h2 className="welcomeModal__title" id="welcomeModal__title">Welcome to LEAI</h2>
        <p className="welcomeModal__body">
          Your AI sales assistant is ready to set up. Head to <strong>AI Sales Config</strong> to
          load your starter template, add your business info, and personalize how your assistant
          talks to leads — it takes less than 5 minutes.
        </p>
        <div className="welcomeModal__actions">
          <button className="welcomeModal__primary" onClick={goToConfig}>
            Set Up My Assistant
          </button>
          <button className="welcomeModal__secondary" onClick={dismiss}>
            I'll do it later
          </button>
        </div>
      </div>
    </div>
  );
}
