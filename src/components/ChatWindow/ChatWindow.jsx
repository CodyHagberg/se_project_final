import { useState, useEffect, useRef } from "react";
import "./ChatWindow.css";

function ChatWindow({ isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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
      const response = await fetch("http://localhost:5000/api/chat/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: userMessage.content })
      });

      const data = await response.json();

      if (data.status === "Success") {
        const assistantMessage = {
          role: "assistant",
          content: data.message,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          role: "assistant",
          content: `Error: ${data.error || "Failed to get response"}`,
          timestamp: new Date()
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        role: "assistant",
        content: `Error: ${error.message || "Failed to connect to server"}`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, errorMessage]);
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
        {/* Header */}
        <div className="chatWindowHeader">
          <h2 className="chatWindowTitle">Chat with Gemini</h2>
          <button
            onClick={onClose}
            className="chatWindowCloseButton"
          >
            ×
          </button>
        </div>

        {/* Messages */}
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

        {/* Input */}
        <div className="chatWindowInputRow">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
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
