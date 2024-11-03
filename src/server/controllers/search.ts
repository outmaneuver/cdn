import { Request, Response } from 'express';
import { ContentModel } from '../models/Content.js';
import { UserModel } from '../models/User.js';
import AppError from '../utils/AppError.js';

export class SearchController {
  async search(req: Request, res: Response) {
    try {
      const { query, type = 'all' } = req.query;
      const searchQuery = { $text: { $search: query as string } };

      let results: any = {};

      if (type === 'all' || type === 'content') {
        results.content = await ContentModel.find(searchQuery)
          .select('title body createdAt')
          .populate('authorId', 'name email')
          .limit(10);
      }

      if (type === 'all' || type === 'users') {
        results.users = await UserModel.find({
          $or: [
            { name: { $regex: query, $options: 'i' } },
            { email: { $regex: query, $options: 'i' } },
          ],
        })
          .select('name email role')
          .limit(10);
      }

      res.json(results);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Search failed' });
      }
    }
  }

  async searchSuggestions(req: Request, res: Response) {
    try {
      const { query } = req.query;
      const suggestions = await ContentModel.aggregate([
        {
          $match: {
            $or: [
              { title: { $regex: query, $options: 'i' } },
              { body: { $regex: query, $options: 'i' } },
            ],
          },
        },
        {
          $project: {
            _id: 1,
            title: 1,
            score: {
              $add: [
                { $cond: [{ $regexMatch: { input: '$title', regex: query as string, options: 'i' } }, 2, 0] },
                { $cond: [{ $regexMatch: { input: '$body', regex: query as string, options: 'i' } }, 1, 0] },
              ],
            },
          },
        },
        { $sort: { score: -1 } },
        { $limit: 5 },
      ]);

      res.json(suggestions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get suggestions' });
    }
  }
} 