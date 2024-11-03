import { Router, Request, Response } from 'express';

const router = Router();

// Content routes
router.get('/', (req: Request, res: Response) => {
  // TODO: Implement content listing
  res.json({ message: 'Content list endpoint' });
});

router.post('/', (req: Request, res: Response) => {
  // TODO: Implement content creation
  res.json({ message: 'Content creation endpoint' });
});

export const contentRouter = router; 