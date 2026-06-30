import axios from 'axios';

const runtimeApi = typeof window !== 'undefined' && window.__API_URL__ && String(window.__API_URL__).trim();
const isLocalDev = typeof window !== 'undefined' && ['localhost', '127.0.0.1'].includes(window.location.hostname);
const fallbackApi = import.meta.env.VITE_API_URL && String(import.meta.env.VITE_API_URL).trim()
  ? String(import.meta.env.VITE_API_URL).trim()
  : isLocalDev
    ? 'http://localhost:5000/api'
    : '/api';

const baseURL = runtimeApi || fallbackApi;
const api = axios.create({
  baseURL,
});

if (typeof window !== 'undefined' && process.env.NODE_ENV !== 'production') {
  console.info('[API] baseURL:', baseURL);
}

// Attach JWT to every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-logout on 401
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(err);
  }
);

export default api;
