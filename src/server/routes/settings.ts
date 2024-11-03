import express from 'express';
import { SettingsController } from '../controllers/settings.js';
import { validateSettings } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();
const settingsController = new SettingsController();

router.use(authenticate); // Protect all settings routes

router.get('/', settingsController.getSettings.bind(settingsController));
router.put('/', validateSettings, settingsController.updateSettings.bind(settingsController));

export const settingsRouter = router; 