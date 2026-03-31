import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../../utils/api";
import logo from "../../assets/ALEI_Logo.svg";
import "./ChatWindow.css";

function ChatWindow({ isOpen, onClose, userName, companyName, leadId, apiKey, idleTimeoutSeconds = 60, maxMessages = 10 }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef(null);
  const messagesBoxRef = useRef(null);
  const hasGreeted = useRef(false);
  const idleTimerRef = useRef(null);

  useEffect(() => {
    const box = messagesBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      sendInitialGreeting();
      hasGreeted.current = true;
    }
  }, [isOpen]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Session timed out due to inactivity.", timestamp: new Date() },
      ]);
      setTimeout(() => onClose(), 2500);
    }, idleTimeoutSeconds * 1000);
  };

  useEffect(() => {
    if (isOpen) resetIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [isOpen]);

  const sendInitialGreeting = async () => {
    setIsLoading(true);
    try {
      const data = await sendChatMessage({
        message: "GREET_USER_FIRST",
        userName,
        companyName,
        leadId,
        apiKey,
      });
      setMessages([{
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      }]);
    } catch (error) {
      console.error("Initial greeting failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!inputValue.trim() || isLoading || limitReached) return;

    const userMessage = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    const userCountAfter = messages.filter((m) => m.role === "user").length + 1;

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);
    resetIdleTimer();

    try {
      const data = await sendChatMessage({
        message: userMessage.content,
        userName,
        companyName,
        leadId,
        apiKey,
        history: messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);

      if (userCountAfter >= maxMessages) {
        setLimitReached(true);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      }
    } catch (error) {
      const errMsg = error.message || "Failed to connect to server";
      if (error.status === 429 || errMsg.includes("message limit")) {
        setLimitReached(true);
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      }
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: errMsg, timestamp: new Date() },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="chatWindowOverlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="chatWindowModal"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="chatWindowHeader">
          <img src={logo} alt="ALEI" className="chatWindowLogo" />
          <button
            onClick={onClose}
            className="chatWindowCloseButton"
          >
            ×
          </button>
        </div>

        <div className="chatWindowMessages" ref={messagesBoxRef}>
          {messages.length === 0 && (
            <div className="chatWindowEmptyState">
              Start a conversation with ALEI...
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={[
                "chatWindowMessageRow",
                msg.role === "user"
                  ? "chatWindowMessageRowUser"
                  : "chatWindowMessageRowAssistant"
              ].join(" ")}
            >
              <div
                className={[
                  "chatWindowBubble",
                  msg.role === "user"
                    ? "chatWindowBubbleUser"
                    : "chatWindowBubbleAssistant"
                ].join(" ")}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="chatWindowMessageRow chatWindowMessageRowAssistant">
              <div className="chatWindowBubble chatWindowBubbleThinking">
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {limitReached ? (
          <div className="chatWindowLimitBanner">
            Conversation limit reached. Thanks for chatting!
          </div>
        ) : (
          <div className="chatWindowInputRow">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Type your message..."
              disabled={isLoading}
              className="chatWindowInput"
            />
            <button
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
              className={[
                "chatWindowSendButton",
                !inputValue.trim() || isLoading
                  ? "chatWindowSendButtonDisabled"
                  : "chatWindowSendButtonEnabled"
              ].join(" ")}
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatWindow;
