import { BASE_URL } from "./constants";

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
      ...customHeaders,
    },
    ...restOptions,
  });

  const data = await response.json();

  if (!response.ok || data.status === "Error") {
    const err = new Error(data.error || "Something went wrong");
    err.status = response.status;
    throw err;
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

/** Admin acting-as-tenant: append ?businessId= to dashboard/config calls. */
function withActingBusiness(path, businessId) {
  if (!businessId) return path;
  const sep = path.includes("?") ? "&" : "?";
  return `${path}${sep}businessId=${encodeURIComponent(businessId)}`;
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

export async function endConversation(leadId, apiKey) {
  return request("/api/chat/end", {
    method: "POST",
    body: JSON.stringify({ leadId }),
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

export async function fetchLeadDetail(id, businessId) {
  return authRequest(withActingBusiness(`/api/dashboard/leads/${id}`, businessId));
}

export async function updateLeadStatus(id, status, businessId) {
  return authRequest(withActingBusiness(`/api/dashboard/leads/${id}/status`, businessId), {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

export async function fetchWidgetSnippet(businessId) {
  return authRequest(withActingBusiness("/api/dashboard/widget-snippet", businessId));
}

export async function fetchConfig(businessId) {
  return authRequest(withActingBusiness("/api/config", businessId));
}

export async function updateConfig(configData, businessId) {
  return authRequest(withActingBusiness("/api/config", businessId), {
    method: "PUT",
    body: JSON.stringify(configData),
  });
}

export async function fetchDefaultTemplate(businessId) {
  return authRequest(withActingBusiness("/api/config/template", businessId));
}

export async function fetchSupportConfig(businessId) {
  return authRequest(withActingBusiness("/api/config/support", businessId));
}

export async function updateSupportConfig(configData, businessId) {
  return authRequest(withActingBusiness("/api/config/support", businessId), {
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

export async function updateMonthlyLeadLimit(userId, monthlyLeadLimit) {
  return authRequest(`/api/admin/lead-limit/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ monthlyLeadLimit }),
  });
}

export async function updateOverageSettings(userId, { overagePriceCents, overageEnabled }) {
  return authRequest(`/api/admin/overage/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ overagePriceCents, overageEnabled }),
  });
}

export async function updateSeatLimit(userId, seatLimit) {
  return authRequest(`/api/admin/seats/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ seatLimit }),
  });
}

export async function fetchTenantUsers() {
  return authRequest("/api/tenant/users");
}

export async function createTenantUser({ email, tempPassword }) {
  return authRequest("/api/tenant/users", {
    method: "POST",
    body: JSON.stringify({ email, tempPassword }),
  });
}

export async function deleteTenantUser(userId) {
  return authRequest(`/api/tenant/users/${userId}`, {
    method: "DELETE",
  });
}

export async function resetTenantUserPassword(userId, tempPassword) {
  return authRequest(`/api/tenant/users/${userId}/reset-password`, {
    method: "POST",
    body: JSON.stringify({ tempPassword }),
  });
}

export async function fetchApiKey(businessId) {
  return authRequest(withActingBusiness("/api/dashboard/api-key", businessId));
}

export async function fetchUsage(businessId) {
  return authRequest(withActingBusiness("/api/dashboard/usage", businessId));
}

export async function enableOverages(businessId) {
  return authRequest(withActingBusiness("/api/dashboard/overage/enable", businessId), {
    method: "POST",
  });
}

export async function disableOverages(businessId) {
  return authRequest(withActingBusiness("/api/dashboard/overage/disable", businessId), {
    method: "POST",
  });
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

export async function fetchSalesforceStatus(businessId) {
  return authRequest(withActingBusiness("/api/integrations/salesforce/status", businessId));
}

export async function disconnectSalesforce(businessId) {
  return authRequest(withActingBusiness("/api/integrations/salesforce/disconnect", businessId), {
    method: "POST",
  });
}

export async function exportLeadsCSV(businessId) {
  const token = localStorage.getItem("token");
  const path = withActingBusiness("/api/dashboard/leads/export/csv", businessId);
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error("Failed to export leads");
  return res.blob();
}
