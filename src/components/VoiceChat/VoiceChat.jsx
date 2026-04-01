import { useState, useEffect, useRef } from "react";
import { WS_BASE_URL, SITE_PUB_KEY } from "../../utils/constants";
import ConversationEnd from "../ConversationEnd/ConversationEnd";
import logo from "../../assets/ALEI_Logo.svg";
import "./VoiceChat.css";

const WS_VOICE_URL = `${WS_BASE_URL}/ws/voice`;
// Server expects 16kHz PCM audio; browser mic may capture at 44.1/48kHz
// so the AudioContext is created at this rate to let the browser resample for us.
const TARGET_SAMPLE_RATE = 16000;

/** Encode raw PCM bytes as base64 for transmission over the WebSocket. */
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function VoiceChat({ leadId, userName, companyName, micStream, onClose, apiKey, idleTimeoutSeconds = 60, appointmentUrl = "" }) {
  const [isConnected, setIsConnected] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [transcript, setTranscript] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState("Connecting...");
  const [timeWarning, setTimeWarning] = useState(null);
  const [conversationEnded, setConversationEnded] = useState(false);
  const [endReason, setEndReason] = useState(null);

  const wsRef = useRef(null);             // WebSocket connection to the voice server
  const audioContextRef = useRef(null);    // AudioContext for mic capture (16kHz)
  const playbackContextRef = useRef(null); // Separate AudioContext for AI audio playback (24kHz)
  const streamRef = useRef(null);          // MediaStream from the user's microphone
  const processorRef = useRef(null);       // ScriptProcessorNode that captures mic frames
  const playbackQueueRef = useRef([]);     // Queued AudioBuffers waiting to be scheduled
  const isPlayingRef = useRef(false);
  const nextPlayTimeRef = useRef(0);       // Tracks the end-time of the last scheduled buffer for gapless playback
  const transcriptBoxRef = useRef(null);   // Scrollable transcript container
  const transcriptEndRef = useRef(null);   // Invisible element at the bottom of the transcript for auto-scroll
  const isMutedRef = useRef(false);        // Mirror of isMuted state so the audio processor callback can read it synchronously
  const idleTimerRef = useRef(null);
  const cleanedUpRef = useRef(false);

  useEffect(() => {
    isMutedRef.current = isMuted;
  }, [isMuted]);

  const resetIdleTimer = () => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (cleanedUpRef.current) return;
      cleanupAll();
      setTimeout(() => { setConversationEnded(true); setEndReason("idle"); }, 3000);
    }, idleTimeoutSeconds * 1000);
  };

  useEffect(() => {
    // Use scrollTop instead of scrollIntoView to keep scroll contained
    // within the transcript div — scrollIntoView propagates to the parent
    // page in iframes, scrolling the widget off-screen and killing mic capture.
    const box = transcriptBoxRef.current;
    if (box) box.scrollTop = box.scrollHeight;
  }, [transcript]);

  // These refs hold the latest closures so the WebSocket onmessage handler
  // (which is set up once) always calls the most recent version of each function
  // without needing to tear down and re-establish the connection on every render.
  const addTranscriptRef = useRef(null);
  const finalizeRef = useRef(null);
  const drainQueueRef = useRef(null);

  useEffect(() => {
    // Append streamed text to the current partial transcript entry,
    // or create a new entry if the speaker changed.
    addTranscriptRef.current = (role, content) => {
      const safe = content.replace(/\[OPEN_CALENDAR\]/g, "");
      if (!safe) return;
      setTranscript((prev) => {
        const last = prev[prev.length - 1];
        if (last && last.role === role && last.partial) {
          const updated = [...prev];
          updated[updated.length - 1] = { ...last, content: last.content + safe };
          return updated;
        }
        return [...prev, { role, content: safe, timestamp: new Date(), partial: true }];
      });
    };

    // Mark the latest transcript entry as complete (no longer partial).
    finalizeRef.current = () => {
      setTranscript((prev) => {
        if (prev.length === 0) return prev;
        const updated = [...prev];
        updated[updated.length - 1] = { ...updated[updated.length - 1], partial: false };
        return updated;
      });
    };

    // Schedule all queued AudioBuffers for gapless playback.
    // Each buffer is scheduled to start exactly when the previous one ends,
    // and the last buffer's `onended` callback either drains newly-arrived
    // chunks or marks playback as finished.
    drainQueueRef.current = () => {
      const ctx = playbackContextRef.current;
      if (!ctx) return;

      if (playbackQueueRef.current.length === 0) {
        isPlayingRef.current = false;
        setIsAiSpeaking(false);
        return;
      }

      isPlayingRef.current = true;
      setIsAiSpeaking(true);

      while (playbackQueueRef.current.length > 0) {
        const buffer = playbackQueueRef.current.shift();
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);

        const startAt = Math.max(ctx.currentTime, nextPlayTimeRef.current);
        source.start(startAt);
        nextPlayTimeRef.current = startAt + buffer.duration;

        if (playbackQueueRef.current.length === 0) {
          source.onended = () => {
            if (playbackQueueRef.current.length > 0) {
              drainQueueRef.current?.();
            } else {
              isPlayingRef.current = false;
              setIsAiSpeaking(false);
            }
          };
        }
      }
    };
  });

  /**
   * Decode a base64-encoded 16-bit PCM chunk from the server,
   * convert it to a Web Audio API buffer, and queue it for playback.
   * The server sends 24kHz mono PCM; we lazily create a dedicated
   * playback AudioContext at that sample rate to avoid resampling artifacts.
   */
  function playAudioChunk(base64Audio) {
    if (!playbackContextRef.current) {
      playbackContextRef.current = new AudioContext({ sampleRate: 24000 });
      nextPlayTimeRef.current = 0;
    }

    const binaryStr = atob(base64Audio);
    const bytes = new Uint8Array(binaryStr.length);
    for (let i = 0; i < binaryStr.length; i++) {
      bytes[i] = binaryStr.charCodeAt(i);
    }

    // Convert signed 16-bit PCM → float32 range [-1, 1] for Web Audio
    const int16 = new Int16Array(bytes.buffer);
    const float32 = new Float32Array(int16.length);
    for (let i = 0; i < int16.length; i++) {
      float32[i] = int16[i] / 32768;
    }

    const audioBuffer = playbackContextRef.current.createBuffer(1, float32.length, 24000);
    audioBuffer.getChannelData(0).set(float32);

    playbackQueueRef.current.push(audioBuffer);
    drainQueueRef.current?.();
  }

  /** Tear down every resource: audio contexts, mic stream, WebSocket, and playback queue. */
  function cleanupAll() {
    cleanedUpRef.current = true;
    if (idleTimerRef.current) { clearTimeout(idleTimerRef.current); idleTimerRef.current = null; }
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
    nextPlayTimeRef.current = 0;
  }

  /**
   * Hook the mic stream into a ScriptProcessorNode that converts each audio
   * frame from float32 to signed 16-bit PCM, base64-encodes it, and sends it
   * over the WebSocket. Called once the server signals "ready".
   */
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

  // Main WebSocket lifecycle — opens once on mount and cleans up on unmount.
  // Protocol: client sends "setup" → server replies "ready" → bidirectional audio streaming begins.
  // Server messages: "audio" (PCM chunks), "transcript" (partial text), "turn_complete", "rate_limit", "error".
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
        apiKey: apiKey || SITE_PUB_KEY,
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
            resetIdleTimer();
            break;

          case "audio":
            if (data.data) {
              setIsThinking(false);
              playAudioChunk(data.data);
            }
            break;

          case "transcript":
            if (data.role && data.content) {
              addTranscriptRef.current?.(data.role, data.content);
              resetIdleTimer();
            }
            break;

          case "turn_complete":
            resetIdleTimer();
            if (data.role === "user") setIsThinking(true);
            if (data.role === "model") setIsThinking(false);
            finalizeRef.current?.();
            break;

          case "time_warning":
            setTimeWarning(data.message || "You have 1 minute remaining.");
            break;

          case "action":
            if (data.action === "open_calendar") {
              cleanupAll();
              setTimeout(() => { setConversationEnded(true); setEndReason("calendar"); }, 3000);
            }
            break;

          case "rate_limit":
            cleanupAll();
            setTimeout(() => { setConversationEnded(true); setEndReason("limit"); }, 3000);
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

  if (conversationEnded) {
    return (
      <div className="voiceChat">
        <ConversationEnd
          appointmentUrl={(endReason === "calendar" || endReason === "limit") ? appointmentUrl : ""}
          reason={endReason}
        />
      </div>
    );
  }

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
        <div className="voiceChatHeader">
          <img src={logo} alt="ALEI" className="voiceChatLogo" />
          <button className="voiceChatCloseBtn" onClick={handleEndCall} title="End conversation">×</button>
        </div>
        <div className="voiceChatVisual">
          <div className={`voiceChatOrb ${isThinking ? "voiceChatOrbThinking" : isAiSpeaking ? "voiceChatOrbSpeaking" : isConnected ? "voiceChatOrbListening" : "voiceChatOrbConnecting"}`}>
            <div className="voiceChatOrbInner" />
          </div>
          <p className="voiceChatStatus">
            {isThinking ? "Thinking..." : isAiSpeaking ? "Speaking..." : isConnected ? "Listening..." : status}
          </p>
          {timeWarning && (
            <p className="voiceChatTimeWarning">{timeWarning}</p>
          )}
        </div>

        <div className="voiceChatTranscript" ref={transcriptBoxRef}>
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
                  {msg.role === "user" ? "You" : "ALEI"}
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
