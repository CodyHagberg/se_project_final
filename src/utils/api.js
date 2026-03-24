import { BASE_URL, DEMO_API_KEY } from "./constants";

function keyHeader(key) {
  if (!key) return {};
  if (key.startsWith("alei_pub_")) return { "X-Publishable-Key": key };
  return { "X-API-Key": key };
}

async function request(endpoint, options = {}) {
  const { headers: customHeaders, ...restOptions } = options;

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": DEMO_API_KEY,
      ...customHeaders,
    },
    ...restOptions,
  });

  const data = await response.json();

  if (!response.ok || data.status === "Error") {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

function authRequest(endpoint, options = {}) {
  const { headers: customHeaders, ...restOptions } = options;
  return request(endpoint, {
    headers: { ...authHeaders(), ...customHeaders },
    ...restOptions,
  });
}

export async function createLead(formData, apiKey) {
  return request("/api/leads", {
    method: "POST",
    body: JSON.stringify(formData),
    headers: apiKey ? keyHeader(apiKey) : {},
  });
}

export async function sendChatMessage({ message, userName, companyName, history, leadId, apiKey }) {
  return request("/api/chat/message", {
    method: "POST",
    body: JSON.stringify({ message, userName, companyName, history, leadId }),
    headers: apiKey ? keyHeader(apiKey) : {},
  });
}

export async function login(email, password) {
  return request("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function changePassword(currentPassword, newPassword) {
  return authRequest("/api/auth/change-password", {
    method: "POST",
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export async function fetchLeads(businessId) {
  const query = businessId ? `?businessId=${businessId}` : "";
  return authRequest(`/api/dashboard/leads${query}`);
}

export async function fetchLeadDetail(id) {
  return authRequest(`/api/dashboard/leads/${id}`);
}

export async function updateLeadStatus(id, status) {
  return authRequest(`/api/dashboard/leads/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function fetchWidgetSnippet() {
  return authRequest("/api/dashboard/widget-snippet");
}

export async function fetchConfig() {
  return authRequest("/api/config");
}

export async function updateConfig(configData) {
  return authRequest("/api/config", {
    method: "PUT",
    body: JSON.stringify(configData),
  });
}

export async function fetchDefaultTemplate() {
  return authRequest("/api/config/template");
}

export async function fetchSupportConfig() {
  return authRequest("/api/config/support");
}

export async function updateSupportConfig(configData) {
  return authRequest("/api/config/support", {
    method: "PUT",
    body: JSON.stringify(configData),
  });
}

export async function createBusiness(data) {
  return authRequest("/api/admin/create-business", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function fetchBusinesses() {
  return authRequest("/api/admin/businesses");
}

export async function regeneratePublishableKey(userId) {
  return authRequest(`/api/admin/regenerate-pub-key/${userId}`, {
    method: "POST",
  });
}

export async function updateAllowedDomains(userId, domains) {
  return authRequest(`/api/admin/domains/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ allowedDomains: domains }),
  });
}

export async function updateGeminiKey(userId, geminiApiKey) {
  return authRequest(`/api/admin/gemini-key/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ geminiApiKey }),
  });
}

export async function fetchApiKey() {
  return authRequest("/api/dashboard/api-key");
}

export async function fetchWidgetConfig(apiKey) {
  const header = apiKey.startsWith("alei_pub_")
    ? { "X-Publishable-Key": apiKey }
    : {};
  const paramName = apiKey.startsWith("alei_pub_") ? "key" : "apiKey";

  const response = await fetch(
    `${BASE_URL}/api/widget/config?${paramName}=${encodeURIComponent(apiKey)}`,
    { headers: { "Content-Type": "application/json", ...header } },
  );
  const data = await response.json();
  if (!response.ok || data.status === "Error") {
    throw new Error(data.error || "Failed to fetch widget config");
  }
  return data;
}

export async function exportLeadsCSV() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${BASE_URL}/api/dashboard/leads/export/csv`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "X-API-Key": DEMO_API_KEY,
    },
  });
  if (!res.ok) throw new Error("Failed to export leads");
  return res.blob();
}
