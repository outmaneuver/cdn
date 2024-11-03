export interface DashboardStats {
  totalContent: number;
  totalUsers: number;
  userMetrics: {
    activeUsers: number;
    newUsers: Array<{
      date: string;
      count: number;
    }>;
  };
  contentMetrics: {
    totalContent: number;
    publishedContent: number;
    contentByCategory: Array<{
      category: string;
      count: number;
    }>;
  };
  engagementMetrics: {
    totalViews: number;
    averageTimeSpent: number;
    popularContent: Array<{
      title: string;
      views: number;
    }>;
  };
  recentActivity: Array<{
    id: string;
    action: 'create' | 'update' | 'delete';
    timestamp: Date;
    userId?: string;
    contentId?: string;
  }>;
}

export interface Content {
  id: string;
  title: string;
  body: string;
  status: 'draft' | 'published';
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  username?: string;
  displayName?: string;
  avatarUrl?: string;
  role: 'admin' | 'user';
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface AnalyticsData {
  views: number;
  uniqueVisitors: number;
  averageTime: number;
  bounceRate: number;
}

export interface Settings {
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
}

export interface SearchResults {
  items: Content[];
  total: number;
  page: number;
  pageSize: number;
} 