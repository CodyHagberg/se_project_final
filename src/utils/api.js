import { BASE_URL } from "./constants";

async function request(endpoint, options = {}) {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const data = await response.json();

  if (!response.ok || data.status === "Error") {
    throw new Error(data.error || "Something went wrong");
  }

  return data;
}

export async function createLead(formData) {
  return request("/api/leads", {
    method: "POST",
    body: JSON.stringify(formData),
  });
}

export async function sendChatMessage({ message, userName, companyName, history }) {
  return request("/api/chat/message", {
    method: "POST",
    body: JSON.stringify({ message, userName, companyName, history }),
  });
}
