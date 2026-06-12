// In production the frontend is served from the same origin as the API, so
// relative paths work for HTTP. The local .env sets these to localhost:5000 for dev.
export const BASE_URL = import.meta.env.VITE_API_URL ?? "";

// WebSockets need an absolute URL. In production derive it from the page origin
// (https://alei.ai → wss://alei.ai). The local .env overrides this for dev.
function defaultWsUrl() {
  if (typeof window === "undefined") return "";
  return window.location.origin.replace(/^https/, "wss").replace(/^http/, "ws");
}
export const WS_BASE_URL = import.meta.env.VITE_WS_URL || defaultWsUrl();
export const SITE_PUB_KEY = import.meta.env.VITE_ALEI_PUB_KEY || "";
