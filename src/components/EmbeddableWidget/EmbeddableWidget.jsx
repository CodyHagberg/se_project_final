import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchWidgetConfig } from "../../utils/api";
import ModalForm from "../ModalForm/ModalForm";
import ChatModeSelector from "../ChatModeSelector/ChatModeSelector";
import ChatWindow from "../ChatWindow/ChatWindow";
import VoiceChat from "../VoiceChat/VoiceChat";
import "./EmbeddableWidget.css";

/**
 * Chrome-free widget designed to be embedded in an iframe on third-party sites,
 * inside the Testing Center preview panel, or inline on the marketing site's Demo page.
 *
 * Flow:  Lead Form  ->  Mode Selector (text / voice)  ->  Chat
 *
 * The tenant's key can be provided via:
 *   1. The `apiKey` prop (used when rendered inline, e.g. DemoView)
 *   2. The URL query string ?key=... or ?apiKey=... (used in iframes)
 *
 * On mount, fetches the tenant's widget customization (title, fields, button
 * text) from the public /api/widget/config endpoint and passes it to ModalForm.
 */
function EmbeddableWidget({ apiKey: apiKeyProp }) {
  const [searchParams] = useSearchParams();
  const widgetKey = apiKeyProp || searchParams.get("key") || searchParams.get("apiKey");

  const [showForm, setShowForm] = useState(true);
  const [leadData, setLeadData] = useState(null);
  const [chatMode, setChatMode] = useState(null);
  const [micError, setMicError] = useState(null);
  const [micStream, setMicStream] = useState(null);
  const [widgetConfig, setWidgetConfig] = useState(null);
  const [chatModes, setChatModes] = useState("both");
  const [idleTimeoutSeconds, setIdleTimeoutSeconds] = useState(60);
  const [maxMessages, setMaxMessages] = useState(10);
  const [appointmentUrl, setAppointmentUrl] = useState("");

  useEffect(() => {
    if (widgetKey) {
      fetchWidgetConfig(widgetKey)
        .then((data) => {
          setWidgetConfig(data.widgetConfig);
          if (data.chatModes) setChatModes(data.chatModes);
          if (data.idleTimeoutSeconds != null) setIdleTimeoutSeconds(data.idleTimeoutSeconds);
          if (data.maxMessages != null) setMaxMessages(data.maxMessages);
          if (data.appointmentUrl) setAppointmentUrl(data.appointmentUrl);
        })
        .catch(() => {});
    }
  }, [widgetKey]);

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

  const isStandalone = !apiKeyProp;

  if (!widgetKey) {
    return (
      <div className={`embeddableWidget${isStandalone ? " embeddableWidget--standalone" : ""}`}>
        <p className="embeddableWidget__error">Missing API key.</p>
      </div>
    );
  }

  return (
    <div className={`embeddableWidget${isStandalone ? " embeddableWidget--standalone" : ""}`}>
      {showForm && <ModalForm onSubmit={handleFormSubmit} apiKey={widgetKey} widgetConfig={widgetConfig} />}

      {leadData && !chatMode && (
        <ChatModeSelector
          userName={leadData.name}
          onSelect={handleModeSelect}
          micError={micError}
          allowedModes={chatModes}
          title={widgetConfig?.modeSelectorTitle}
          description={widgetConfig?.modeSelectorDescription}
        />
      )}

      {chatMode === "text" && (
        <ChatWindow
          isOpen={true}
          onClose={handleBackToModeSelect}
          userName={leadData?.name}
          companyName={leadData?.companyName}
          leadId={leadData?.id}
          apiKey={widgetKey}
          idleTimeoutSeconds={idleTimeoutSeconds}
          maxMessages={maxMessages}
          appointmentUrl={appointmentUrl}
        />
      )}

      {chatMode === "voice" && (
        <VoiceChat
          leadId={leadData?.id}
          userName={leadData?.name}
          companyName={leadData?.companyName}
          micStream={micStream}
          onClose={handleBackToModeSelect}
          apiKey={widgetKey}
          idleTimeoutSeconds={idleTimeoutSeconds}
          appointmentUrl={appointmentUrl}
        />
      )}
    </div>
  );
}

export default EmbeddableWidget;
