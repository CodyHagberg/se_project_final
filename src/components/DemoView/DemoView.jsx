import { useState, useRef } from "react";
import ChatWindow from "../ChatWindow/ChatWindow";
import ChatModeSelector from "../ChatModeSelector/ChatModeSelector";
import VoiceChat from "../VoiceChat/VoiceChat";
import ModalForm from "../ModalForm/ModalForm";
import "../../pages/Pages.css";
import "./DemoView.css";

function DemoView() {
  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);
  const [chatMode, setChatMode] = useState(null);
  const [micError, setMicError] = useState(null);
  const micStreamRef = useRef(null);

  const handleFormSubmit = (lead) => {
    setLeadData(lead);
    setShowForm(false);
  };

  const handleModeSelect = async (mode) => {
    if (mode === "voice") {
      setMicError(null);
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            sampleRate: 16000,
            channelCount: 1,
            echoCancellation: true,
            noiseSuppression: true,
          },
        });
        micStreamRef.current = stream;
        setChatMode("voice");
      } catch (err) {
        if (err.name === "NotAllowedError") {
          setMicError("Microphone access denied. Please allow microphone access to use voice chat.");
        } else {
          setMicError("Could not access microphone: " + err.message);
        }
      }
    } else {
      setChatMode(mode);
    }
  };

  const handleBackToModeSelect = () => {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    setChatMode(null);
    setMicError(null);
  };

  return (
    <div className="demoView">
      <h1 className="demoViewTitle">Demo</h1>

      {showForm && <ModalForm onSubmit={handleFormSubmit} />}

      {leadData && !chatMode && (
        <ChatModeSelector
          userName={leadData.name}
          onSelect={handleModeSelect}
          micError={micError}
        />
      )}

      {chatMode === "text" && (
        <ChatWindow
          isOpen={true}
          onClose={handleBackToModeSelect}
          userName={leadData?.name}
          companyName={leadData?.companyName}
          leadId={leadData?.id}
        />
      )}

      {chatMode === "voice" && (
        <VoiceChat
          leadId={leadData?.id}
          userName={leadData?.name}
          companyName={leadData?.companyName}
          micStream={micStreamRef.current}
          onClose={handleBackToModeSelect}
        />
      )}
    </div>
  );
}

export default DemoView;
