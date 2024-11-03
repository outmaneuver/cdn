import { Request, Response } from 'express';
import { UserModel } from '../models/User.js';
import { signJWT } from '../utils/jwt.js';
import AppError from '../utils/AppError.js';
import bcrypt from 'bcryptjs';

export class AuthController {
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await UserModel.findOne({ email }).select('+password');
      
      if (!user) {
        throw new AppError('Invalid email or password', 401);
      }

      // Compare passwords
      const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new AppError('Invalid email or password', 401);
      }

      // Generate JWT token
      const token = await signJWT({ userId: user._id.toString() });

      // Update last active
      user.lastActive = new Date();
      await user.save();

      // Send response without password
      const userResponse = {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        avatarUrl: user.avatarUrl,
        username: user.username,
        displayName: user.displayName
      };

      res.json({
        token,
        user: userResponse
      });
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        console.error('Login error:', error);
        res.status(500).json({ message: 'An error occurred during login' });
      }
    }
  }

  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;
      
      console.log('Registration attempt for:', email);
      
      if (!email || !password) {
        throw new AppError('Email and password are required', 400);
      }

      const existingUser = await UserModel.findOne({ email });
      if (existingUser) {
        throw new AppError('Email already registered', 400);
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await UserModel.create({
        email,
        password: hashedPassword,
        name,
        role: 'user',
        lastActive: new Date()
      });

      const token = await signJWT({ userId: user._id.toString() });
      
      res.status(201).json({ 
        token, 
        user: { 
          id: user._id, 
          email: user.email,
          name: user.name,
          role: user.role 
        }
      });
    } catch (error: unknown) {
      if (error instanceof AppError) {
        return res.status(error.statusCode).json({ message: error.message });
      } 
      
      if (error instanceof Error) {
        console.error('Registration error:', {
          name: error.name,
          message: error.message,
          stack: error.stack
        });

        if (error.name === 'ValidationError') {
          return res.status(400).json({ 
            message: 'Invalid input data',
            details: error.message
          });
        }
      }
      
      res.status(500).json({ message: 'An error occurred during registration' });
    }
  }

  async getCurrentUser(req: Request, res: Response) {
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
        res.status(500).json({ message: 'Failed to get current user' });
      }
    }
  }

  async logout(_req: Request, res: Response) {
    res.json({ message: 'Logged out successfully' });
  }
} 