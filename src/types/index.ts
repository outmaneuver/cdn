export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  role?: 'admin' | 'user';
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ApiError {
  message: string;
  status: number;
} 