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
  CircularProgress,
} from '@mui/material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNotification } from '../../contexts/NotificationContext';
import { settingsApi } from '../../services/api';
import type { Settings } from '../../types/api';

const Settings: React.FC = () => {
  const { showNotification } = useNotification();
  const queryClient = useQueryClient();

  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ['settings'],
    queryFn: async () => {
      const response = await settingsApi.get();
      return response.data;
    }
  });

  const mutation = useMutation({
    mutationFn: async (newSettings: Settings) => {
      const response = await settingsApi.update(newSettings);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      showNotification('Settings updated successfully', 'success');
    },
    onError: () => {
      showNotification('Failed to update settings', 'error');
    },
  });

  if (isLoading || !settings) {
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
                  onChange={(e) => mutation.mutate({ 
                    ...settings,
                    theme: e.target.checked ? 'dark' : 'light' 
                  })}
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
                  onChange={(e) => 
                    mutation.mutate({
                      ...settings,
                      notifications: {
                        ...settings?.notifications,
                        email: e.target.checked
                      }
                    })
                  }
                />
              }
              label="Email Notifications"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings?.notifications.push}
                  onChange={(e) => 
                    mutation.mutate({
                      ...settings,
                      notifications: {
                        ...settings?.notifications,
                        push: e.target.checked
                      }
                    })
                  }
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
                onChange={(e) => mutation.mutate({
                  ...settings,
                  displayPreferences: {
                    ...settings?.displayPreferences,
                    density: e.target.value as Settings['displayPreferences']['density'],
                  },
                })}
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