import { Request, Response } from 'express';
import { ContentModel } from '../models/Content.js';
import { UserModel } from '../models/User.js';
import AppError from '../utils/AppError.js';
import { startOfDay, subDays } from 'date-fns';

export class AnalyticsController {
  async getAnalytics(_req: Request, res: Response) {
    try {
      const [
        totalUsers,
        activeUsers,
        totalContent,
        publishedContent,
        newUsers,
        contentByCategory,
        popularContent
      ] = await Promise.all([
        UserModel.countDocuments(),
        UserModel.countDocuments({ lastActive: { $gte: subDays(new Date(), 1) } }),
        ContentModel.countDocuments(),
        ContentModel.countDocuments({ status: 'published' }),
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
          totalContent,
          publishedContent,
          contentByCategory
        },
        engagementMetrics: {
          totalViews: await this.getTotalViews(),
          averageTimeSpent: await this.getAverageTimeSpent(),
          popularContent
        }
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to fetch analytics' });
      }
    }
  }

  async getContentStats(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const content = await ContentModel.findById(id);
      
      if (!content) {
        throw new AppError('Content not found', 404);
      }

      // Get content specific stats
      const stats = {
        views: content.views,
        // Add other content specific stats here
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

  private async getNewUsersStats() {
    const thirtyDaysAgo = subDays(startOfDay(new Date()), 30);
    const users = await UserModel.aggregate([
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
        $sort: { _id: 1 }
      }
    ]);

    return users.map(({ _id, count }) => ({
      date: _id,
      count
    }));
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
          category: '$_id',
          count: 1,
          _id: 0
        }
      }
    ]);
  }

  private async getPopularContent() {
    return ContentModel.find()
      .sort({ views: -1 })
      .limit(10)
      .select('title views');
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
    // Implement actual time tracking logic
    return 300; // 5 minutes in seconds as placeholder
  }
} 