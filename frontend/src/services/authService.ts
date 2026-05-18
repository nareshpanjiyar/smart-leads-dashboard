import api from './api';

interface RegisterData {
  name: string;
  email: string;
  password: string;
  role?: string;
}
interface LoginData {
  email: string;
  password: string;
}

export const register = (data: RegisterData) => api.post('/auth/register', data);
export const login = (data: LoginData) => api.post('/auth/login', data);
export const getProfile = () => api.get('/auth/profile'); // we could add a /me endpoint, but not required.