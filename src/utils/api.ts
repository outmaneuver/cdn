import axios from 'axios';
import { ApiError } from '@/types';

export const api = axios.create({
  baseURL: '/api',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    const apiError: ApiError = {
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || 500
    };
    
    if (apiError.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    
    return Promise.reject(apiError);
  }
);

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const { data } = await api.get<DashboardStats>('/api/dashboard/stats');
  return data;
};