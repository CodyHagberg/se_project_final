import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import ModalForm from "../ModalForm/ModalForm";
import ChatModeSelector from "../ChatModeSelector/ChatModeSelector";
import ChatWindow from "../ChatWindow/ChatWindow";
import VoiceChat from "../VoiceChat/VoiceChat";
import "./EmbeddableWidget.css";

function EmbeddableWidget() {
  const [searchParams] = useSearchParams();
  const apiKey = searchParams.get("apiKey");

  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);
  const [chatMode, setChatMode] = useState(null);
  const [micError, setMicError] = useState(null);
  const [micStream, setMicStream] = useState(null);

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
        setMicStream(stream);
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
    if (micStream) {
      micStream.getTracks().forEach((t) => t.stop());
      setMicStream(null);
    }
    setChatMode(null);
    setMicError(null);
  };

  if (!apiKey) {
    return (
      <div className="embeddableWidget">
        <p className="embeddableWidget__error">Missing API key.</p>
      </div>
    );
  }

  return (
    <div className="embeddableWidget">
      {showForm && <ModalForm onSubmit={handleFormSubmit} apiKey={apiKey} />}

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
          apiKey={apiKey}
        />
      )}

      {chatMode === "voice" && (
        <VoiceChat
          leadId={leadData?.id}
          userName={leadData?.name}
          companyName={leadData?.companyName}
          micStream={micStream}
          onClose={handleBackToModeSelect}
          apiKey={apiKey}
        />
      )}
    </div>
  );
}

export default EmbeddableWidget;
