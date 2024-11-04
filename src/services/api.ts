import axios from 'axios';
import type { DashboardStats } from '@/types/api';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api` || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export const contentApi = {
  getAll: () => api.get('/content'),
  getOne: (id: string) => api.get(`/content/${id}`),
  create: (data: ContentPayload) => api.post('/content', data),
  update: (id: string, data: ContentPayload) => api.put(`/content/${id}`, data),
  delete: (id: string) => api.delete(`/content/${id}`)
};

export const analyticsApi = {
  getDashboardMetrics: () => api.get('/analytics/dashboard'),
  getContentMetrics: () => api.get('/analytics/content'),
  getUserMetrics: () => api.get('/analytics/users')
};

export const settingsApi = {
  get: () => api.get('/settings'),
  update: (data: SettingsPayload) => api.put('/settings', data)
};

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get('/analytics/dashboard');
  return data;
};

export default api;