import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";
import "./SupportBubble.css";

function SupportBubble({ apiKey: apiKeyProp }) {
  const [searchParams] = useSearchParams();
  const apiKey = apiKeyProp || searchParams.get("key") || searchParams.get("apiKey");

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const hasGreeted = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen && apiKey && !hasGreeted.current) {
      hasGreeted.current = true;
      sendMessage("GREET_USER_FIRST", []);
    }
  }, [isOpen, apiKey]);

  const sendMessage = async (message, history) => {
    setIsLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(apiKey?.startsWith("alei_pub_")
            ? { "X-Publishable-Key": apiKey }
            : { "X-API-Key": apiKey }),
        },
        body: JSON.stringify({
          message,
          mode: "support",
          userName: "Visitor",
          companyName: "",
          history,
        }),
      });
      const data = await res.json();
      if (data.status === "Error") throw new Error(data.error);

      setMessages((prev) => [
        ...prev,
        ...(message !== "GREET_USER_FIRST"
          ? [{ role: "user", content: message }]
          : []),
        { role: "assistant", content: data.message },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I'm having trouble connecting. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() || isLoading) return;
    const text = inputValue.trim();
    setInputValue("");

    const history = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    sendMessage(text, history);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!apiKey) return null;

  return (
    <div className="supportBubble">
      {isOpen && (
        <div className="supportBubble__window">
          <div className="supportBubble__header">
            <span className="supportBubble__headerTitle">Support</span>
            <button
              className="supportBubble__closeBtn"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <div className="supportBubble__messages">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`supportBubble__msg ${msg.role === "user" ? "supportBubble__msg--user" : "supportBubble__msg--ai"}`}
              >
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="supportBubble__msg supportBubble__msg--ai supportBubble__msg--thinking">
                Typing...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="supportBubble__inputRow">
            <input
              type="text"
              className="supportBubble__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask a question..."
              disabled={isLoading}
            />
            <button
              className="supportBubble__sendBtn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={`supportBubble__toggle ${isOpen ? "supportBubble__toggle--open" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>
    </div>
  );
}

export default SupportBubble;
