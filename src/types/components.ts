import { ReactNode } from 'react';

export interface LayoutProps {
  children: ReactNode;
}

export interface ProtectedRouteProps {
  children: ReactNode;
}

export interface NotificationProviderProps {
  children: ReactNode;
}

export interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export interface MenuItem {
  text: string;
  icon: ReactNode;
  path: string;
} 