import { Request, Response } from 'express';
import { UserModel } from '../models/User.js';
import AppError from '../utils/AppError.js';

export class UserController {
  async getProfile(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const user = await UserModel.findById(userId).select('-password');
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      res.json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to get user profile' });
      }
    }
  }

  async getStats(req: Request, res: Response) {
    try {
      const userId = req.user!.id;
      const user = await UserModel.findById(userId);
      
      if (!user) {
        throw new AppError('User not found', 404);
      }

      const stats = {
        profileViews: user.profileViews || 0,
        totalContent: 0, // Implement content counting
        lastActive: user.lastActive
      };

      res.json(stats);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to get user stats' });
      }
    }
  }

  async updateUsername(req: Request, res: Response) {
    try {
      const { username } = req.body;
      const userId = req.user!.id;

      const existingUser = await UserModel.findOne({ username });
      if (existingUser && existingUser._id.toString() !== userId) {
        throw new AppError('Username already taken', 400);
      }

      const user = await UserModel.findByIdAndUpdate(
        userId,
        { username },
        { new: true }
      ).select('-password');

      res.json(user);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to update username' });
      }
    }
  }
} 