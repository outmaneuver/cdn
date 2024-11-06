// src/server/controllers/dashboard.ts
import { Request, Response } from 'express';
import { UserModel } from '../models/User.js';
import { ContentModel } from '../models/Content.js';
import { startOfDay, subDays } from 'date-fns';

export class DashboardController {
  async getStats(req: Request, res: Response) {
    try {
      const [
        totalUsers,
        activeUsers,
        newUsers,
        contentStats,
        recentActivity
      ] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.countDocuments({ lastActive: { $gte: subDays(new Date(), 1) } }),
        this.getNewUsersStats(),
        this.getContentStats(),
        this.getRecentActivity()
      ]);

      res.json({
        userMetrics: {
          totalUsers,
          activeUsers,
          newUsers
        },
        contentMetrics: contentStats,
        recentActivity
      });
    } catch (error) {
      console.error('Dashboard stats error:', error);
      res.status(500).json({ message: 'Failed to fetch dashboard stats' });
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
      {
        $sort: { date: 1 }
      }
    ]);
  }

  private async getContentStats() {
    const [totalContent, publishedContent, contentByCategory] = await Promise.all([
      ContentModel.countDocuments(),
      ContentModel.countDocuments({ status: 'published' }),
      ContentModel.aggregate([
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            category: '$_id',
            count: 1,
            _id: 0
          }
        }
      ])
    ]);

    return {
      totalContent,
      publishedContent,
      contentByCategory
    };
  }

  private async getRecentActivity() {
    return ContentModel.find()
      .sort({ updatedAt: -1 })
      .limit(10)
      .select('action timestamp userId contentId')
      .lean();
  }
}