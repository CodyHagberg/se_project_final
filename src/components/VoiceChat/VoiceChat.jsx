import { useState, useEffect, useRef } from "react";
import { WS_BASE_URL, DEMO_API_KEY } from "../../utils/constants";
import "./VoiceChat.css";

const WS_VOICE_URL = `${WS_BASE_URL}/ws/voice`;
const TARGET_SAMPLE_RATE = 16000;

function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function VoiceChat({ leadId, userName, companyName, micStream, onClose }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Connecting...");

  const wsRef = useRef(null);
  const audioContextRef = useRef(null);
  const playbackContextRef = useRef(null);
  const streamRef = useRef(null);
  const processorRef = useRef(null);
  const playbackQueueRef = useRef([]);
  const isPlayingRef = useRef(false);
  const transcriptEndRef = useRef(null);
  const isMutedRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const addTranscriptRef = useRef(null);
  const finalizeRef = useRef(null);
  const drainQueueRef = useRef(null);

  useEffect(() => {
    addTranscriptRef.current = (role, content) => {
      setTranscript((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === role && last.partial) {
          const updated = [...prev];
          updated[updated.length - 1] = { ...last, content: last.content + content };
          return updated;
        }
        return [...prev, { role, content, timestamp: new Date(), partial: true }];
      });
    };

    finalizeRef.current = () => {
      setTranscript((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], partial: false };
        return updated;
      });
    };

    drainQueueRef.current = () => {
      if (playbackQueueRef.current.length === 0) {
        isPlayingRef.current = false;
        setIsAiSpeaking(false);
        return;
      }
      isPlayingRef.current = true;
      setIsAiSpeaking(true);

      const ctx = playbackContextRef.current;
      if (!ctx) return;

      const buffer = playbackQueueRef.current.shift();
      const source = ctx.createBufferSource();
      source.buffer = buffer;
      source.connect(ctx.destination);
      source.onended = () => drainQueueRef.current?.();
      source.start();
    };
  });

  function playAudioChunk(base64Audio) {
    if (!playbackContextRef.current) {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
    }

    const binaryStr = atob(base64Audio);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;
    }

    const audioBuffer = playbackContextRef.current.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);

    playbackQueueRef.current.push(audioBuffer);
    if (!isPlayingRef.current) {
      drainQueueRef.current?.();
    }
  }

  function cleanupAll() {
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    if (playbackContextRef.current) {
      playbackContextRef.current.close().catch(() => {});
      playbackContextRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
    playbackQueueRef.current = [];
    isPlayingRef.current = false;
  }

  function startAudioCapture() {
    if (!micStream) {
      setError("No microphone stream available. Please go back and try again.");
      return;
    }
    streamRef.current = micStream;

    const audioContext = new AudioContext({ sampleRate: TARGET_SAMPLE_RATE });
    audioContextRef.current = audioContext;

    const source = audioContext.createMediaStreamSource(micStream);
    const processor = audioContext.createScriptProcessor(4096, 1, 1);
    processorRef.current = processor;

    processor.onaudioprocess = (e) => {
      if (isMutedRef.current) return;
      if (wsRef.current?.readyState !== WebSocket.OPEN) return;

      const float32 = e.inputBuffer.getChannelData(0);
      const int16 = new Int16Array(float32.length);
      for (let i = 0; i < float32.length; i++) {
        const s = Math.max(-1, Math.min(1, float32[i]));
        int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
      }

      const base64 = arrayBufferToBase64(int16.buffer);
      wsRef.current.send(JSON.stringify({
        type: "audio",
        data: base64,
      }));
    };

    source.connect(processor);
    processor.connect(audioContext.destination);
    setStatus("Connected — speak now");
  }

  useEffect(() => {
    const ws = new WebSocket(WS_VOICE_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      setIsConnected(true);
      setError(null);
      setStatus("Setting up...");

      ws.send(JSON.stringify({
        type: "setup",
        leadId,
        userName,
        companyName,
        apiKey: DEMO_API_KEY,
      }));
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        switch (data.type) {
          case "ready":
            setError(null);
            setStatus("Listening...");
            startAudioCapture();
            break;

          case "audio":
            if (data.data) {
              playAudioChunk(data.data);
            }
            break;

          case "transcript":
            if (data.role && data.content) {
              addTranscriptRef.current?.(data.role, data.content);
            }
            break;

          case "turn_complete":
            finalizeRef.current?.();
            break;

          case "rate_limit":
            setError(data.message || "Message limit reached. Thanks for trying LEAI!");
            cleanupAll();
            break;

          case "error":
            setError(data.message || "An error occurred");
            break;

          default:
            break;
        }
      } catch {
        // non-JSON message, ignore
      }
    };

    ws.onerror = () => {
      setError("Connection error. Please try again.");
      setIsConnected(false);
    };

    ws.onclose = () => {
      setIsConnected(false);
      setStatus("Disconnected");
    };

    return () => {
      cleanupAll();
    };
  }, []);

  const handleEndCall = () => {
    cleanupAll();
    onClose();
  };

  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  if (error) {
    return (
      <div className="voiceChat">
        <div className="voiceChatError">
          <div className="voiceChatErrorIcon">!</div>
          <p className="voiceChatErrorText">{error}</p>
          <div className="voiceChatErrorActions">
            <button className="voiceChatBtn voiceChatBtnSecondary" onClick={onClose}>
              Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="voiceChat">
      <div className="voiceChatMain">
        <div className="voiceChatVisual">
          <div className={`voiceChatOrb ${isAiSpeaking ? "voiceChatOrbSpeaking" : isConnected ? "voiceChatOrbListening" : "voiceChatOrbConnecting"}`}>
            <div className="voiceChatOrbInner" />
          </div>
          <p className="voiceChatStatus">{status}</p>
        </div>

        <div className="voiceChatTranscript">
          <div className="voiceChatTranscriptInner">
            {transcript.length === 0 && isConnected && (
              <p className="voiceChatTranscriptEmpty">
                The conversation transcript will appear here...
              </p>
            )}
            {transcript.map((msg, i) => (
              <div
                key={i}
                className={`voiceChatMsg ${msg.role === "user" ? "voiceChatMsgUser" : "voiceChatMsgAssistant"}`}
              >
                <span className="voiceChatMsgRole">
                  {msg.role === "user" ? "You" : "LEAI"}
                </span>
                <p className="voiceChatMsgText">{msg.content}</p>
              </div>
            ))}
            <div ref={transcriptEndRef} />
          </div>
        </div>

        <div className="voiceChatControls">
          <button
            className={`voiceChatBtn voiceChatBtnRound ${isMuted ? "voiceChatBtnMuted" : ""}`}
            onClick={toggleMute}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="1" y1="1" x2="23" y2="23" />
                <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2c0 .76-.13 1.49-.35 2.17" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                <line x1="12" y1="19" x2="12" y2="23" />
                <line x1="8" y1="23" x2="16" y2="23" />
              </svg>
            )}
          </button>

          <button
            className="voiceChatBtn voiceChatBtnEnd"
            onClick={handleEndCall}
            title="End conversation"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 2.59 3.4z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default VoiceChat;
