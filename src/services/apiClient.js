const DEFAULT_API_BASE_URL = "https://merxus-ai-backend-215800813926.us-central1.run.app";
const API_BASE_URL = String(import.meta.env.VITE_MERXUS_API_BASE_URL || DEFAULT_API_BASE_URL).replace(/\/+$/g, "");

async function parseResponse(response) {
  const text = await response.text();
  let data = {};
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (_) {
      data = { message: text };
    }
  }
  if (!response.ok) {
    const error = new Error(data.error || data.message || `Request failed: ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
}

export async function apiGet(path) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  return parseResponse(response);
}

export async function apiPost(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return parseResponse(response);
}
