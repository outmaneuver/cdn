import { Request, Response } from 'express';
import { SettingsModel } from '../models/Settings.js';
import AppError from '../utils/AppError.js';

export class SettingsController {
  async getSettings(req: Request, res: Response) {
    try {
      const settings = await SettingsModel.findOne({ userId: req.user!.id });
      
      if (!settings) {
        // Create default settings if none exist
        const defaultSettings = await SettingsModel.create({
          userId: req.user!.id
        });
        return res.json(defaultSettings);
      }
      
      res.json(settings);
    } catch (error) {
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to get settings' });
      }
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
      if (error instanceof AppError) {
        res.status(error.statusCode).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Failed to update settings' });
      }
    }
  }
} 