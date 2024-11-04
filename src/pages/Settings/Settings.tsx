// src/pages/Settings/Settings.tsx
import { useQuery, useMutation } from '@tanstack/react-query';
import {
  Card,
  Switch,
  FormControlLabel,
  TextField
} from '@mui/material';
import { settingsApi } from '@/services/api';
import type { Settings } from '@/types/api';

export default function Settings() {
  const { data: settings } = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await settingsApi.get();
      return response.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: Partial<Settings>) => {
      const response = await settingsApi.update(newSettings);
      return response.data;
    }
  });

  const handleChange = (field: keyof Settings, value: any) => {
    if (!settings) return;
    
    mutation.mutate({
      ...settings,
      [field]: value
    });
  };

  if (!settings) return null;

  return (
    <Card sx={{ p: 3 }}>
      <FormControlLabel
        control={
          <Switch
            checked={settings.notifications.email}
            onChange={(e) => handleChange('notifications', {
              ...settings.notifications,
              email: e.target.checked
            })}
          />
        }
        label="Email Notifications"
      />
      <TextField
        fullWidth
        label="Default Language"
        select
        value={settings.displayPreferences.language}
        onChange={(e) => handleChange('displayPreferences', {
          ...settings.displayPreferences,
          language: e.target.value
        })}
        SelectProps={{
          native: true
        }}
      >
        <option value="en">English</option>
        <option value="es">Spanish</option>
        <option value="fr">French</option>
      </TextField>
    </Card>
  );
}