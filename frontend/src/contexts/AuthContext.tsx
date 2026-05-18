import { createContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types';
import { login as loginApi, register as registerApi } from '../services/authService';
import api from '../services/api';

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string, role?: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Fetch user profile (optional, we can decode token)
      // For simplicity, decode manually:
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ _id: payload.id, name: '', email: '', role: payload.role });
      } catch {
        logout();
      }
    }
    setLoading(false);
  }, [token]);

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