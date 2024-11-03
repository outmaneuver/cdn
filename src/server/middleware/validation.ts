import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = loginSchema.extend({
  name: z.string().min(2, 'Name must be at least 2 characters'),
});

const contentSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title is too long'),
  body: z.string().min(1, 'Content is required'),
  status: z.enum(['draft', 'published']).optional(),
  category: z.string().optional(),
});

const settingsSchema = z.object({
  theme: z.enum(['light', 'dark']).optional(),
  notifications: z.object({
    email: z.boolean(),
    push: z.boolean(),
    contentUpdates: z.boolean(),
    systemAlerts: z.boolean(),
  }).optional(),
  displayPreferences: z.object({
    density: z.enum(['comfortable', 'compact', 'standard']),
    language: z.string(),
    timezone: z.string(),
  }).optional(),
});

const usernameSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be less than 30 characters')
    .regex(/^[a-zA-Z0-9_-]+$/, 'Username can only contain letters, numbers, underscores, and hyphens'),
});

export function validateLogin(req: Request, res: Response, next: NextFunction) {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export function validateRegister(req: Request, res: Response, next: NextFunction) {
  try {
    const result = registerSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: result.error.errors[0].message 
      });
    }

    next();
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({ message: 'Internal server error during validation' });
  }
}

export function validateContent(req: Request, res: Response, next: NextFunction) {
  try {
    contentSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export function validateSettings(req: Request, res: Response, next: NextFunction) {
  try {
    settingsSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ message: error.errors[0].message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

export function validateUsername(req: Request, res: Response, next: NextFunction) {
  try {
    const result = usernameSchema.safeParse(req.body);
    
    if (!result.success) {
      return res.status(400).json({ 
        message: result.error.errors[0].message 
      });
    }

    next();
  } catch (error) {
    console.error('Username validation error:', error);
    res.status(500).json({ message: 'Internal server error during validation' });
  }
} 