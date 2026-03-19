import { BASE_URL, DEMO_API_KEY } from "./constants";

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
    headers: apiKey ? { "X-API-Key": apiKey } : {},
  });
}

export async function sendChatMessage({ message, userName, companyName, history, leadId, apiKey }) {
  return request("/api/chat/message", {
    method: "POST",
    body: JSON.stringify({ message, userName, companyName, history, leadId }),
    headers: apiKey ? { "X-API-Key": apiKey } : {},
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

export async function fetchApiKey() {
  return authRequest("/api/dashboard/api-key");
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
