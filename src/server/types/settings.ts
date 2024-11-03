import { Document } from 'mongoose';

export interface UserSettings {
  userId: string;
  maxFileSize: number;
  allowedFileTypes: string[];
  uploadEndpoint: string;
  customDomain?: string;
  notificationPreferences: {
    email: boolean;
    desktop: boolean;
  };
  securitySettings: {
    twoFactorEnabled: boolean;
    apiKeyEnabled: boolean;
  };
}

export interface SettingsDocument extends Document, UserSettings {} 