import { Router, Request, Response } from 'express';
import { AuthRequest, CustomResponse } from '../types';

const router = Router();

// Authentication routes
router.post('/login', (req: Request, res: Response) => {
  // TODO: Implement login
  res.json({ message: 'Login endpoint' });
});

router.post('/register', (req: Request, res: Response) => {
  // TODO: Implement registration
  res.json({ message: 'Register endpoint' });
});

export const authRouter = router; 