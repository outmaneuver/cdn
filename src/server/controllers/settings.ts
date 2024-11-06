import { Request, Response } from 'express';
import { SettingsModel } from '../models/Settings.js';

export class SettingsController {
  async getSettings(req: Request, res: Response) {
    try {
      let settings = await SettingsModel.findOne({ userId: req.user!.id });
      
      if (!settings) {
        // Create default settings if none exist
        settings = await SettingsModel.create({
          userId: req.user!.id,
          theme: 'light',
          notifications: {
            email: true,
            push: true,
            contentUpdates: true,
            systemAlerts: true
          },
          displayPreferences: {
            density: 'comfortable',
            language: 'en',
            timezone: 'UTC'
          }
        });
      }
      
      res.json(settings);
    } catch (error) {
      console.error('Settings Error:', error);
      res.status(500).json({ message: 'Failed to fetch settings' });
    }
  }

  async updateSettings(req: Request, res: Response) {
    try {
      const settings = await SettingsModel.findOneAndUpdate(
        { userId: req.user!.id },
        { $set: req.body },
        { new: true, upsert: true }
      );
      
      res.json(settings);
    } catch (error) {
      console.error('Settings Update Error:', error);
      res.status(500).json({ message: 'Failed to update settings' });
    }
  }
} 