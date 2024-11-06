import express from 'express';
import { AnalyticsController } from '../controllers/analytics.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const analyticsController = new AnalyticsController();

// Apply authentication middleware to all analytics routes
router.use(authenticate);

// Analytics routes
router.get('/', analyticsController.getAnalytics.bind(analyticsController));
router.get('/dashboard', analyticsController.getDashboardStats.bind(analyticsController));
router.get('/content/:id', analyticsController.getContentStats.bind(analyticsController));
router.get('/user/:id', analyticsController.getUserStats.bind(analyticsController));

export const analyticsRouter = router;