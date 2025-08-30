// Modify according to the local IP address of the computer
export const BASE_URL = 'http://192.168.43.52:3001/api';

export const apiFetch = async (endpoint: string, options: RequestInit = {}, token?: string) => {
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