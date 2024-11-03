import express from 'express';
import { AnalyticsController } from '../controllers/analytics.js';

const router = express.Router();
const analyticsController = new AnalyticsController();

router.get('/dashboard', analyticsController.getAnalytics.bind(analyticsController));
router.get('/content/:id', analyticsController.getContentStats?.bind(analyticsController));

export { router as analyticsRouter }; 