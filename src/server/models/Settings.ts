import mongoose from 'mongoose';
import type { Settings } from '../types/index.js';

const settingsSchema = new mongoose.Schema<Settings>({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  theme: {
    type: String,
    enum: ['light', 'dark'],
    default: 'light'
  },
  notifications: {
    email: { type: Boolean, default: true },
    push: { type: Boolean, default: true },
    contentUpdates: { type: Boolean, default: true },
    systemAlerts: { type: Boolean, default: true }
  },
  displayPreferences: {
    density: {
      type: String,
      enum: ['comfortable', 'compact', 'standard'],
      default: 'comfortable'
    },
    language: { type: String, default: 'en' },
    timezone: { type: String, default: 'UTC' }
  }
}, {
  timestamps: true
});

export const SettingsModel = mongoose.model<Settings>('Settings', settingsSchema);