export interface UserSettings {
  id: string;
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

export interface UpdateSettingsRequest {
  maxFileSize?: number;
  allowedFileTypes?: string[];
  customDomain?: string;
  notificationPreferences?: {
    email: boolean;
    desktop: boolean;
  };
  securitySettings?: {
    twoFactorEnabled: boolean;
    apiKeyEnabled: boolean;
  };
} 