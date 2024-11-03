import mongoose, { Schema, Document } from 'mongoose';
import { UserSettings } from '../types/settings';

export interface SettingsDocument extends Document, UserSettings {}

const settingsSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  maxFileSize: { type: Number, default: 5 * 1024 * 1024 }, // 5MB default
  allowedFileTypes: { type: [String], default: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'] },
  uploadEndpoint: { type: String, required: true },
  customDomain: { type: String },
  notificationPreferences: {
    email: { type: Boolean, default: true },
    desktop: { type: Boolean, default: true }
  },
  securitySettings: {
    twoFactorEnabled: { type: Boolean, default: false },
    apiKeyEnabled: { type: Boolean, default: false }
  }
}, {
  timestamps: true
});

export const SettingsModel = mongoose.model<SettingsDocument>('Settings', settingsSchema);