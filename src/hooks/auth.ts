import { useMutation } from '@tanstack/react-query';
import { login, signUp } from '../api/auth.js';
import { useContext } from 'react';
import { UserContext } from '../components/UserContext.js';

export const useLogin = () => {
  const { login: loginUser } = useUser();
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const data = await login(email, password);
      loginUser(data);
      return data;
    },
  });
};

export const useSignup = () => {
  const { login } = useUser();
  return useMutation({
    mutationFn: async ({ name, email, password }: { name: string, email: string; password: string }) => {
      const data = await signUp(name, email, password);
      login(data);
      return data;
    },
  });
};

export const useUser = () => {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error('useUser must be used within a UserProvider!');
  }

  return ctx;
}