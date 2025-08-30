import { createContext } from 'react';
import type { UserData } from '../types/types.js';

export const DEFAULT_USER = {
  email: '',
  id: '',
  name: '',
  walletBalance: 0,
  averageContentQuality: 0,
  token: ''
};

const DEFAULT_CONTEXT_VALUE = {
  user: DEFAULT_USER,
  login: (user: UserData) => {},
  logout: () => {},
};


export const UserContext = createContext(DEFAULT_CONTEXT_VALUE);
