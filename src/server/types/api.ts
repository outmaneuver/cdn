import { Document } from 'mongoose';

export interface User extends Document {
  email: string;
  password: string;
  name?: string;
  role: 'admin' | 'user';
  lastActive: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Content extends Document {
  title: string;
  body: string;
  status: 'draft' | 'published';
  category?: string;
  authorId: User['_id'];
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface Settings extends Document {
  userId: User['_id'];
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    contentUpdates: boolean;
    systemAlerts: boolean;
  };
  displayPreferences: {
    density: 'comfortable' | 'compact' | 'standard';
    language: string;
    timezone: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardStats {
  totalContent: number;
  totalUsers: number;
  recentActivity: {
    id: string;
    action: string;
    timestamp: Date;
    userId?: string;
    contentId?: string;
  }[];
}

export interface AnalyticsData {
  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: {
      date: string;
      count: number;
    }[];
  };
  contentMetrics: {
    totalContent: number;
    publishedContent: number;
    contentByCategory: {
      category: string;
      count: number;
    }[];
  };
  engagementMetrics: {
    totalViews: number;
    averageTimeSpent: number;
    popularContent: {
      id: string;
      title: string;
      views: number;
    }[];
  };
} 