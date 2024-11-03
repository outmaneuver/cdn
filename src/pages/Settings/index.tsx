import React from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  FormControlLabel,
  Switch,
  Select,
  MenuItem,
  InputLabel,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../contexts/NotificationContext';
import type { UserSettings, UpdateSettingsRequest } from '../../types/settings';
import { fetchSettings, updateSettings } from '../../services/api';

const Settings: React.FC = () => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<UserSettings>({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });

  const mutation = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      showNotification({
        type: 'success',
        message: 'Settings updated successfully',
      });
    },
    onError: () => {
      showNotification({
        type: 'error',
        message: 'Failed to update settings',
      });
    },
  });

  const handleThemeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    mutation.mutate({
      theme: event.target.checked ? 'dark' : 'light',
    });
  };

  const handleNotificationChange = (key: keyof UserSettings['notifications']) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    mutation.mutate({
      notifications: {
        ...settings?.notifications,
        [key]: event.target.checked,
      },
    });
  };

  const handleDensityChange = (event: any) => {
    mutation.mutate({
      displayPreferences: {
        ...settings?.displayPreferences,
        density: event.target.value,
      },
    });
  };

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Theme
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings?.theme === 'dark'}
                  onChange={handleThemeChange}
                />
              }
              label="Dark Mode"
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={settings?.notifications.email}
                  onChange={handleNotificationChange('email')}
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings?.notifications.push}
                  onChange={handleNotificationChange('push')}
                />
              }
              label="Push Notifications"
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Display Preferences
            </Typography>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Density</InputLabel>
              <Select
                value={settings?.displayPreferences.density}
                onChange={handleDensityChange}
                label="Density"
              >
                <MenuItem value="comfortable">Comfortable</MenuItem>
                <MenuItem value="compact">Compact</MenuItem>
                <MenuItem value="standard">Standard</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 