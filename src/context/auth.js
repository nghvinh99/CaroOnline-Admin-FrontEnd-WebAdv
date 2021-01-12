import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  auth: false,
  login: () => { },
  logout: () => { },
  check: () => { },
});

export function useAuth() {
  return useContext(AuthContext);
}