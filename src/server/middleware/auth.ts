import { Request, Response, NextFunction } from 'express';
import { verifyJWT } from '../utils/jwt.js';
import { UserModel } from '../models/User.js';
import AppError from '../utils/AppError.js';

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new AppError('Authentication required', 401);
    }

    const payload = await verifyJWT(token);
    if (!payload || !payload.userId) {
      throw new AppError('Invalid token', 401);
    }

    const user = await UserModel.findById(payload.userId).select('-password');
    if (!user) {
      throw new AppError('User not found', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof AppError) {
      res.status(error.statusCode).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 