import { useState, useEffect, useRef } from "react";
import { sendChatMessage } from "../../utils/api";
import "./ChatWindow.css";

function ChatWindow({ isOpen, onClose, userName, companyName}) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasGreeted = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      sendInitialGreeting();
      hasGreeted.current = true;
    }
  }, [isOpen]);

  const sendInitialGreeting = async () => {
    setIsLoading(true);
    try {
      const data = await sendChatMessage({
        message: "GREET_USER_FIRST",
        userName,
        companyName,
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
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      role: "user",
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const data = await sendChatMessage({
        message: userMessage.content,
        userName,
        companyName,
        history: messages.map((msg) => ({
          role: msg.role === "user" ? "user" : "model",
          parts: [{ text: msg.content }],
        })),
      });

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.message, timestamp: new Date() },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${error.message || "Failed to connect to server"}`,
          timestamp: new Date(),
        },
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
          <h2 className="chatWindowTitle">Chat with Gemini</h2>
          <button
            onClick={onClose}
            className="chatWindowCloseButton"
          >
            ×
          </button>
        </div>

        <div className="chatWindowMessages">
          {messages.length === 0 && (
            <div className="chatWindowEmptyState">
              Start a conversation with Gemini...
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
      </div>
    </div>
  );
}

export default ChatWindow;
