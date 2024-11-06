import { Request, Response } from 'express';
import { ContentModel } from '../models/Content.js';
import { UserModel } from '../models/User.js';
import { subDays, startOfDay } from 'date-fns';
import AppError from '../utils/AppError.js';

export class AnalyticsController {
  async getAnalytics(_req: Request, res: Response) {
    try {
      const [
        totalUsers,
        activeUsers,
        newUsers,
        contentStats,
        popularContent
      ] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.countDocuments({ lastActive: { $gte: subDays(new Date(), 30) } }),
        this.getNewUsersStats(),
        this.getContentByCategory(),
        this.getPopularContent()
      ]);

      res.json({
        userMetrics: {
          totalUsers,
          activeUsers,
          newUsers
        },
        contentMetrics: {
          totalContent: await ContentModel.countDocuments(),
          publishedContent: await ContentModel.countDocuments({ status: 'published' }),
          contentByCategory: contentStats
        },
        engagementMetrics: {
          totalViews: await this.getTotalViews(),
          averageTimeSpent: await this.getAverageTimeSpent(),
          popularContent
        }
      });
    } catch (error) {
      console.error('Analytics Error:', error);
      res.status(500).json({ message: 'Failed to fetch analytics data' });
    }
  }

  async getDashboardStats(_req: Request, res: Response) {
    try {
      const [
        totalUsers,
        activeUsers,
        newUsers,
        contentStats,
        recentActivity,
        engagementMetrics
      ] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.countDocuments({ lastActive: { $gte: subDays(new Date(), 1) } }),
        this.getNewUsersStats(),
        this.getContentMetrics(),
        this.getRecentActivity(),
        this.getEngagementMetrics()
      ]);

      res.json({
        userMetrics: {
          totalUsers,
          activeUsers,
          newUsers
        },
        contentMetrics: contentStats,
        engagementMetrics,
        recentActivity
      });
    } catch (error) {
      console.error('Dashboard Stats Error:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard stats' });
    }
  }

  async getContentStats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const content = await ContentModel.findById(id);
      
      if (!content) {
        throw new AppError('Content not found', 404);
      }

      const stats = {
        views: content.views || 0,
        // Add more content-specific stats here
      };

      res.json(stats);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to fetch content stats' });
      }
    }
  }

  async getUserStats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await UserModel.findById(id);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const stats = {
        totalContent: await ContentModel.countDocuments({ authorId: id }),
        profileViews: user.profileViews || 0,
        lastActive: user.lastActive
      };

      res.json(stats);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to fetch user stats' });
      }
    }
  }

  private async getNewUsersStats() {
    const thirtyDaysAgo = subDays(startOfDay(new Date()), 30);
    return UserModel.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          date: '$_id',
          count: 1,
          _id: 0
        }
      },
      { $sort: { date: 1 } }
    ]);
  }

  private async getContentByCategory() {
    return ContentModel.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $project: {
          category: { $ifNull: ['$_id', 'Uncategorized'] },
          count: 1,
          _id: 0
        }
      }
    ]);
  }

  private async getPopularContent() {
    return ContentModel.find({ status: 'published' })
      .sort({ views: -1 })
      .limit(10)
      .select('title views -_id');
  }

  private async getTotalViews() {
    const result = await ContentModel.aggregate([
      {
        $group: {
          _id: null,
          totalViews: { $sum: '$views' }
        }
      }
    ]);
    return result[0]?.totalViews || 0;
  }

  private async getAverageTimeSpent() {
    // Implement your time tracking logic here
    return 300; // Default 5 minutes in seconds
  }

  private async getContentMetrics() {
    return {
      totalContent: await ContentModel.countDocuments(),
      publishedContent: await ContentModel.countDocuments({ status: 'published' }),
      contentByCategory: await this.getContentByCategory()
    };
  }

  private async getRecentActivity() {
    const activities = await ContentModel.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('title updatedAt authorId')
      .populate('authorId', 'name');

    return activities.map(activity => ({
      id: activity._id,
      action: 'update',
      timestamp: activity.updatedAt,
      userId: activity.authorId,
      contentId: activity._id
    }));
  }

  private async getEngagementMetrics() {
    const [totalViews, popularContent] = await Promise.all([
      this.getTotalViews(),
      this.getPopularContent()
    ]);

    return {
      totalViews,
      averageTimeSpent: await this.getAverageTimeSpent(),
      popularContent
    };
  }
} 