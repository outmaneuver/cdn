import express from 'express';
import { authRouter } from './auth.js';
import { contentRouter } from './content.js';
import { settingsRouter } from './settings.js';
import { analyticsRouter } from './analytics.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/content', authenticate, contentRouter);
router.use('/settings', authenticate, settingsRouter);
router.use('/analytics', authenticate, analyticsRouter);

export default router;