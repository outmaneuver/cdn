import express from 'express';
import { AnalyticsController } from '../controllers/analytics.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const analyticsController = new AnalyticsController();

// Protect all analytics routes
router.use(authenticate);

router.get('/dashboard', analyticsController.getAnalytics.bind(analyticsController));
router.get('/content/:id', analyticsController.getContentStats.bind(analyticsController));

export { router as analyticsRouter };