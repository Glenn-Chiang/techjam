import type { UserData } from '../types/types.js';
import { useState } from 'react';
import { DEFAULT_USER, UserContext } from './UserContext.js';
import type { PropsWithChildren } from 'react';

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<UserData>(DEFAULT_USER);

  const login = (user: UserData) => {
    setUser(user);
  }
  const logout = () => setUser(DEFAULT_USER);
  const value = {
    user,
    login,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
