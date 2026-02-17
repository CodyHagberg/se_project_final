import { useState } from "react";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import "./Pages.css";

function Demo() {
  const [isChatOpen, setIsChatOpen] = useState(true);

  return (
    <div className="page">
      <h1 className="pageTitle">Demo Page</h1>
      <button
        onClick={() => setIsChatOpen(true)}
        className="primaryButton"
      >
        Open Chat
      </button>
      <ChatWindow
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
    </div>
  );
}

export default Demo;