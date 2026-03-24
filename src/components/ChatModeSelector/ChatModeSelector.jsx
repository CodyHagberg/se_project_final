import "./ChatModeSelector.css";

function ChatModeSelector({
  userName,
  onSelect,
  micError,
  allowedModes = "both",
  title,
  description,
}) {
  const showVoice = allowedModes === "both" || allowedModes === "voice";
  const showText = allowedModes === "both" || allowedModes === "text";

  const displayTitle = title || `Welcome, ${userName}!`;
  const displayDesc = description || "How would you like to chat with our AI assistant?";

  return (
    <div className="modeSelector">
      <h2 className="modeSelectorTitle">{displayTitle}</h2>
      <p className="modeSelectorSubtitle">{displayDesc}</p>
      {micError && (
        <p className="modeSelectorError">{micError}</p>
      )}
      <div className="modeSelectorCards">
        {showVoice && (
          <button
            className="modeSelectorCard"
            onClick={() => onSelect("voice")}
          >
            <div className="modeSelectorIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            </div>
            <h3 className="modeSelectorCardTitle">Voice Conversation</h3>
            <p className="modeSelectorCardDesc">
              Speak naturally with our AI assistant in a real-time voice conversation
            </p>
          </button>
        )}

        {showText && (
          <button
            className="modeSelectorCard"
            onClick={() => onSelect("text")}
          >
            <div className="modeSelectorIcon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </div>
            <h3 className="modeSelectorCardTitle">Text Chat</h3>
            <p className="modeSelectorCardDesc">
              Type your messages and chat with our AI assistant via text
            </p>
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatModeSelector;
