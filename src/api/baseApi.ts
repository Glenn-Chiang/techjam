import { getToken } from "./auth.js";

export const BASE_URL = 'https://localhost:3001';

export const apiFetch = async (endpoint: string, options: RequestInit = {}) => {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
};
