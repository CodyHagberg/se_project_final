import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchWidgetConfig } from "../../utils/api";
import ModalForm from "../ModalForm/ModalForm";
import ChatModeSelector from "../ChatModeSelector/ChatModeSelector";
import ChatWindow from "../ChatWindow/ChatWindow";
import VoiceChat from "../VoiceChat/VoiceChat";
import "./EmbeddableWidget.css";

/**
 * Chrome-free widget designed to be embedded in an iframe on third-party sites
 * or inside the Dojo preview panel.
 *
 * Flow:  Lead Form  →  Mode Selector (text / voice)  →  Chat
 *
 * The tenant's API key is read from the URL query string (?apiKey=…) and
 * threaded into every child component so all API calls authenticate against
 * the correct tenant rather than the hardcoded demo key.
 *
 * On mount, fetches the tenant's widget customization (title, fields, button
 * text) from the public /api/widget/config endpoint and passes it to ModalForm.
 */
function EmbeddableWidget() {
  const [searchParams] = useSearchParams();
  // Tenant API key supplied by whoever generates the iframe URL
  const apiKey = searchParams.get("apiKey");

  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);   // populated after the lead form is submitted
  const [chatMode, setChatMode] = useState(null);    // null | "text" | "voice"
  const [micError, setMicError] = useState(null);
  const [micStream, setMicStream] = useState(null);  // raw MediaStream for voice mode
  const [widgetConfig, setWidgetConfig] = useState(null);

  useEffect(() => {
    if (apiKey) {
      fetchWidgetConfig(apiKey)
        .then((data) => setWidgetConfig(data.widgetConfig))
        .catch(() => {});
    }
  }, [apiKey]);

  const handleFormSubmit = (lead) => {
    setLeadData(lead);
    setShowForm(false);
  };

  /**
   * When voice is selected we need to acquire the mic stream *before*
   * rendering VoiceChat — the component expects the stream as a prop so
   * it can immediately begin capturing audio frames.
   */
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

  // Tear down the mic stream and return the user to the mode selector
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
      {/* Step 1 — Capture the lead's contact info (uses tenant's widget config if available) */}
      {showForm && <ModalForm onSubmit={handleFormSubmit} apiKey={apiKey} widgetConfig={widgetConfig} />}

      {/* Step 2 — Let the lead pick text or voice chat */}
      {leadData && !chatMode && (
        <ChatModeSelector
          userName={leadData.name}
          onSelect={handleModeSelect}
          micError={micError}
        />
      )}

      {/* Step 3a — Text chat with the tenant's AI */}
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

      {/* Step 3b — Real-time voice chat with the tenant's AI */}
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
