import { Document, Types } from 'mongoose';

export interface User extends Document {
  _id: Types.ObjectId;
  email: string;
  password: string;
  name?: string;
  role: 'admin' | 'user';
  lastActive: Date;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  profileViews: number;
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