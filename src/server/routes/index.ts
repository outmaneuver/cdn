import express from 'express';
import { authRouter } from './auth.js';
import { contentRouter } from './content.js';
import { settingsRouter } from './settings.js';
import { searchRouter } from './search.js';
import { userRouter } from './user.js';
import { analyticsRouter } from './analytics.js';

const router = express.Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/content', contentRouter);
router.use('/settings', settingsRouter);
router.use('/search', searchRouter);
router.use('/analytics', analyticsRouter);

export default router;