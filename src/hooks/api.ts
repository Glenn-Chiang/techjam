import { BASE_URL } from '../api/baseApi.js';
import { useUser } from './auth.js';

/** Returns an API handler instance that handles the JWT Token, if any */
export function useApiFetch() {
  const { user } = useUser();
  return async (endpoint: string, options: RequestInit = {}) => {
    const token = user.token;
    const headers = new Headers(options.headers || {});
    if (token !== '') {
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
}
