import { useState } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { login as loginApi, register as registerApi } from '../services/authService';
import api from '../services/api';
import { AuthContext } from './auth';

interface TokenPayload {
  id: string;
  role: User['role'];
}

const decodeToken = (storedToken: string): User | null => {
  try {
    const payload = JSON.parse(atob(storedToken.split('.')[1])) as TokenPayload;
    return { _id: payload.id, name: '', email: '', role: payload.role };
  } catch {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    return null;
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const initialToken = localStorage.getItem('token');
  const [user, setUser] = useState<User | null>(() => {
    if (!initialToken) return null;
    api.defaults.headers.common['Authorization'] = `Bearer ${initialToken}`;
    return decodeToken(initialToken);
  });
  const [token, setToken] = useState<string | null>(() => {
    if (!initialToken) return null;
    if (decodeToken(initialToken)) {
      return initialToken;
    }
    return null;
  });
  const loading = false;

  const login = async (email: string, password: string) => {
    const { data } = await loginApi({ email, password });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
  };

  const register = async (name: string, email: string, password: string, role?: string) => {
    const { data } = await registerApi({ name, email, password, role });
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser({ _id: data._id, name: data.name, email: data.email, role: data.role });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
