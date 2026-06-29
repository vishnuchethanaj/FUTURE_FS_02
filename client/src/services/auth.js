import api from './api';

export const login = (email, password) =>
  api.post('/auth/login', { email, password }).then((r) => r.data);

export const startGoogleLogin = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google`;
};

export const getCurrentUser = () => {
  const raw = localStorage.getItem('user');
  return raw ? JSON.parse(raw) : null;
};

export const saveSession = ({ token, user }) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

export const isAuthenticated = () => !!localStorage.getItem('token');
