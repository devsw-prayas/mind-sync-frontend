// Thin fetch wrapper. Base URL comes from VITE_API_URL at build time.
// When VITE_API_URL is empty the app runs fully on the in-memory mock (see mock.js).

export const API_URL = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
export const USE_MOCK = API_URL === '';

let authToken = null;
export const setToken = (t) => { authToken = t; };

export async function http(path, { method = 'GET', body, headers } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...headers,
    },
    body: body != null ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const detail = await res.text().catch(() => '');
    throw new Error(`${method} ${path} -> ${res.status} ${detail}`.trim());
  }
  return res.status === 204 ? null : res.json();
}
