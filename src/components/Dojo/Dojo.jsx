import { useState, useEffect, useRef } from "react";
import { fetchApiKey } from "../../utils/api";
import { BASE_URL, DEMO_API_KEY } from "../../utils/constants";
import "./Dojo.css";

function Dojo() {
  const [apiKey, setApiKey] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const messagesEndRef = useRef(null);
  const hasGreeted = useRef(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const data = await fetchApiKey();
      setApiKey(data.apiKey);
      setIframeUrl(`${window.location.origin}/widget?apiKey=${data.apiKey}`);
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    if (apiKey && !hasGreeted.current) {
      hasGreeted.current = true;
      sendTestMessage("GREET_USER_FIRST", []);
    }
  }, [apiKey]);

  const sendTestMessage = async (message, history) => {
    setIsLoading(true);
    try {
      const key = apiKey || DEMO_API_KEY;
      const res = await fetch(`${BASE_URL}/api/chat/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": key,
        },
        body: JSON.stringify({
          message,
          userName: "Test User",
          companyName: "Test Company",
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
        { role: "assistant", content: `Error: ${err.message}` },
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

    sendTestMessage(text, history);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleReset = () => {
    setMessages([]);
    hasGreeted.current = false;
    if (apiKey) {
      hasGreeted.current = true;
      sendTestMessage("GREET_USER_FIRST", []);
    }
  };

  return (
    <div className="dojo">
      <div className="dojo__header">
        <h2 className="dojo__title">Dojo</h2>
        <p className="dojo__subtitle">
          Preview your widget and test your AI configuration in real time.
        </p>
      </div>

      {error && <p className="dojo__error">{error}</p>}

      <div className="dojo__panels">
        <div className="dojo__panel dojo__panel--iframe">
          <div className="dojo__panelHeader">
            <span className="dojo__panelLabel">Widget Preview</span>
          </div>
          <div className="dojo__iframeWrap">
            {iframeUrl ? (
              <iframe
                src={iframeUrl}
                title="Widget Preview"
                className="dojo__iframe"
              />
            ) : (
              <p className="dojo__iframePlaceholder">Loading preview...</p>
            )}
          </div>
        </div>

        <div className="dojo__panel dojo__panel--chat">
          <div className="dojo__panelHeader">
            <span className="dojo__panelLabel">Test Chat</span>
            <button className="dojo__resetBtn" onClick={handleReset}>
              Reset
            </button>
          </div>
          <div className="dojo__messages">
            {messages.length === 0 && !isLoading && (
              <p className="dojo__emptyState">
                Your AI will greet you using your system knowledge...
              </p>
            )}
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`dojo__msg ${msg.role === "user" ? "dojo__msg--user" : "dojo__msg--ai"}`}
              >
                <span className="dojo__msgRole">
                  {msg.role === "user" ? "You" : "AI"}
                </span>
                <p className="dojo__msgText">{msg.content}</p>
              </div>
            ))}
            {isLoading && (
              <div className="dojo__msg dojo__msg--ai">
                <span className="dojo__msgRole">AI</span>
                <p className="dojo__msgText dojo__msgText--thinking">Thinking...</p>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          <div className="dojo__inputRow">
            <input
              type="text"
              className="dojo__input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type a test message..."
              disabled={isLoading}
            />
            <button
              className="dojo__sendBtn"
              onClick={handleSend}
              disabled={!inputValue.trim() || isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dojo;
