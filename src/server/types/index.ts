import { Document, Types } from 'mongoose';
import type { User } from './user';

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

export interface Content extends Document {
  title: string;
  body: string;
  status: 'draft' | 'published';
  category?: string;
  authorId: Types.ObjectId | string;
  views: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface BaseDocument extends Document {
  createdAt: Date;
  updatedAt: Date;
}

export interface DashboardMetrics {
  userMetrics: {
    totalUsers: number;
    activeUsers: number;
    newUsers: number;
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

export type { User };