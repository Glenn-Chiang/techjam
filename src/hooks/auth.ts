import { useMutation } from '@tanstack/react-query';
import { login, setToken } from '../api/auth.js';

export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const data = await login(username, password);
      setToken(data.token); // store the JWT
      return data;
    },
  });
};
