import { useState, useEffect, useRef } from "react";
import { fetchApiKey } from "../../utils/api";
import { BASE_URL, DEMO_API_KEY } from "../../utils/constants";
import "./Dojo.css";

/**
 * Dashboard view for previewing and testing a tenant's AI configuration.
 *
 * Layout:
 *   Left panel  — iframe embedding the EmbeddableWidget route (/widget?apiKey=…)
 *                  so the tenant can see exactly what end-users experience.
 *   Right panel — inline test chat that hits the chat API directly with
 *                  the tenant's own API key, letting them verify system
 *                  knowledge without filling out the lead form each time.
 */
function Dojo() {
  const [apiKey, setApiKey] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [iframeUrl, setIframeUrl] = useState("");
  const messagesEndRef = useRef(null);
  // Prevents the auto-greeting from firing more than once
  const hasGreeted = useRef(false);

  // Keep the chat scrolled to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Fetch the tenant's API key on mount so we can authenticate all requests
  useEffect(() => {
    loadApiKey();
  }, []);

  const loadApiKey = async () => {
    try {
      const data = await fetchApiKey();
      setApiKey(data.apiKey);
      const widgetKey = data.publishableKey || data.apiKey;
      setIframeUrl(`${window.location.origin}/widget?key=${widgetKey}`);
    } catch (err) {
      setError(err.message);
    }
  };

  // Once the key is loaded, fire an initial greeting from the AI so the
  // test panel isn't empty when the page first renders.
  useEffect(() => {
    if (apiKey && !hasGreeted.current) {
      hasGreeted.current = true;
      sendTestMessage("GREET_USER_FIRST", []);
    }
  }, [apiKey]);

  /**
   * Sends a message to the chat API using a direct fetch (bypassing the
   * shared api.js helpers) so we can inject the tenant's API key and use
   * placeholder user/company names for testing.
   *
   * The special "GREET_USER_FIRST" sentinel tells the backend to reply
   * with an opening greeting rather than expecting real user input.
   */
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

      // For the initial greeting we only append the AI response;
      // for normal messages we prepend the user bubble too.
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

    // Convert local message history into the Gemini multi-turn format
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

  // Clear the conversation and re-trigger the AI greeting
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

      {/* Two-column layout: widget preview on the left, test chat on the right */}
      <div className="dojo__panels">
        {/* Left panel — iframe loads the EmbeddableWidget so the tenant
            sees the exact same form → mode select → chat flow end-users get */}
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

        {/* Right panel — lightweight inline chat that bypasses the lead form,
            useful for quickly testing system knowledge without re-submitting */}
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
