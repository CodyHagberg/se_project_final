import { useState } from "react";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import ModalForm from "../components/ModalForm/ModalForm";
import "./Pages.css";

function Demo() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);

  const handleFormSubmit = (lead) => {
    setLeadData(lead);
    setShowForm(false);
    setIsChatOpen(true);
  };

  return (
    <div className="page">
      <h1 className="pageTitle">Demo Page</h1>
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
      />
    </div>
  );
}

export default Demo;