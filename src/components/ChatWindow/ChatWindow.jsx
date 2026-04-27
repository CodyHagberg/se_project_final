import { useState, useEffect, useRef } from "react";
import { sendChatMessage, endConversation } from "../../utils/api";
import ConversationEnd from "../ConversationEnd/ConversationEnd";
import logo from "../../assets/ALEI_Logo.svg";
import "./ChatWindow.css";

function ChatWindow({ isOpen, onClose, userName, companyName, leadId, apiKey, idleTimeoutSeconds = 60, maxMessages = 10, appointmentUrl = "", onShowContent }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [endReason, setEndReason] = useState(null);
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
      setLimitReached(true);
      setTimeout(() => { setConversationEnded(true); setEndReason("idle"); }, 3000);
    }, idleTimeoutSeconds * 1000);
  };

  useEffect(() => {
    if (isOpen) resetIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [isOpen]);

  useEffect(() => {
    if (conversationEnded && leadId) {
      endConversation(leadId, apiKey).catch((err) =>
        console.error("End conversation signal failed:", err.message)
      );
    }
  }, [conversationEnded]);

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
      if (data.contentAction && onShowContent) {
        onShowContent(data.contentAction);
      }
    } catch (error) {
      console.error("Initial greeting failed:", error);
      setMessages([{
        role: "assistant",
        content: error.message || "Something went wrong loading the assistant. Please type a message to try again.",
        timestamp: new Date(),
      }]);
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
        history: messages
          .filter((msg) => msg.role !== "content")
          .map((msg) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
          })),
      });

      const safeMessage = (data.message || "")
        .replace(/\[END_CONVERSATION\]/g, "")
        .replace(/\[SHOW_CONTENT:[^\]]*\]/g, "")
        .trim();
      setMessages((prev) => [...prev, { role: "assistant", content: safeMessage, timestamp: new Date() }]);
      if (data.contentAction && onShowContent) {
        onShowContent(data.contentAction);
      }

      if (data.action === "end_conversation") {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        setLimitReached(true);
        setTimeout(() => { setConversationEnded(true); setEndReason("ai_complete"); }, 3000);
      } else if (userCountAfter >= maxMessages) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        setLimitReached(true);
        setTimeout(() => { setConversationEnded(true); setEndReason("limit"); }, 3000);
      }
    } catch (error) {
      const errMsg = error.message || "Failed to connect to server";
      if (error.status === 429 || errMsg.includes("message limit")) {
        if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
        setLimitReached(true);
        setTimeout(() => { setConversationEnded(true); setEndReason("limit"); }, 3000);
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

        {conversationEnded ? (
          <ConversationEnd
            appointmentUrl={appointmentUrl}
            reason={endReason}
          />
        ) : limitReached ? (
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
