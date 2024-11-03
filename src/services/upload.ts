import axios from 'axios';
import { api } from './api';

export interface UploadResponse {
  url: string;
  filename: string;
  mimetype: string;
  size: number;
}

export const uploadFile = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await api.post<UploadResponse>('/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data;
};

export const deleteFile = async (filename: string): Promise<void> => {
  await api.delete(`/upload/${filename}`);
}; 