// src/utils/api-error.ts
import { ApiError } from '@/types';

export function handleApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error) && error.response) {
    return {
      message: error.response.data.message || 'An error occurred',
      status: error.response.status
    };
  }
  return {
    message: 'An unexpected error occurred',
    status: 500
  };
}