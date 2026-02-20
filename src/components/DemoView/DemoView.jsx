/**
 * DemoView.jsx
 * Demo route content: lead form first, then welcome + "Open Chat" and ChatWindow.
 * On form submit, lead is saved via API; form hides and chat opens with
 * personalized greeting. Passes userName/companyName to ChatWindow for AI context.
 */
import { useState } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";
import ModalForm from "../ModalForm/ModalForm";
import "../../pages/Pages.css";
import "./DemoView.css";

function DemoView() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);

  const handleFormSubmit = (lead) => {
    setLeadData(lead);
    setShowForm(false);
    setIsChatOpen(true);
  };

  return (
    <div className="demoView">
      <h1 className="demoViewTitle">Demo</h1>
      {showForm && <ModalForm onSubmit={handleFormSubmit} />}
      {leadData && (
        <div className="demoWelcome">
          <p>Welcome, {leadData.name}! Ready to chat with Gemini?</p>
          <button
            onClick={() => setIsChatOpen(true)}
            className="primaryButton demoChatButton"
          >
            Open Chat
          </button>
        </div>
      )}
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        userName={leadData?.name}
        companyName={leadData?.companyName}
      />
    </div>
  );
}

export default DemoView;
