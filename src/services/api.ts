import axios from 'axios';
import type { DashboardStats, Content, Settings, AnalyticsData } from '@/types/api';

// Define ContentForm type inline since it's specific to API requests
interface ContentForm {
  title: string;
  body: string;
  status: 'draft' | 'published';
  category?: string;
}

// Define SettingsPayload type for settings update
type SettingsPayload = Partial<Settings>;

export const api = axios.create({
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
  getAll: () => api.get<Content[]>('/content').then(res => res.data),
  getById: (id: string) => api.get<Content>(`/content/${id}`).then(res => res.data),
  create: (data: ContentForm) => api.post<Content>('/content', data).then(res => res.data),
  update: (id: string, data: ContentForm) => api.put<Content>(`/content/${id}`, data).then(res => res.data),
  delete: (id: string) => api.delete(`/content/${id}`).then(res => res.data),
  fetchContent: (page = 1, limit = 10) => 
    api.get<{ items: Content[]; total: number }>(`/content?page=${page}&limit=${limit}`)
      .then(res => res.data),
};

export const analyticsApi = {
  getAnalytics: () => api.get<AnalyticsData>('/analytics').then(res => res.data),
  getDashboardStats: () => api.get<DashboardStats>('/analytics/dashboard').then(res => res.data),
};

export const settingsApi = {
  get: () => api.get<Settings>('/settings').then(res => res.data),
  update: (data: Partial<Settings>) => api.put<Settings>('/settings', data).then(res => res.data),
  updatePassword: (data: { currentPassword: string; newPassword: string }) => 
    api.put('/settings/password', data).then(res => res.data),
  uploadAvatar: (file: File) => {
    const formData = new FormData();
    formData.append('avatar', file);
    return api.post('/settings/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then(res => res.data)
  }
};

export type { ContentForm, SettingsPayload };