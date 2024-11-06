import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Switch,
  FormControlLabel,
  Button,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { settingsApi } from '@/services/api';
import { useNotification } from '@/contexts/NotificationContext';
import FileUpload from '@/components/FileUpload';
import type { Settings } from '@/types/api';

interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface SettingsForm {
  theme: 'light' | 'dark';
  notifications: {
    email: boolean;
    push: boolean;
    contentUpdates: boolean;
    systemAlerts: boolean;
  };
  displayPreferences: {
    density: 'comfortable' | 'compact' | 'standard';
    language: string;
    timezone: string;
  };
}

const SettingsPage: React.FC = () => {
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control: settingsControl, handleSubmit: handleSettingsSubmit } = useForm<SettingsForm>();
  const { control: passwordControl, handleSubmit: handlePasswordSubmit, reset: resetPassword } = useForm<PasswordUpdate>();

  const { data: settings, isLoading } = useQuery({
    queryKey: ['settings'],
    queryFn: settingsApi.get
  });

  const updateSettingsMutation = useMutation({
    mutationFn: settingsApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['settings'] });
      showNotification('Settings updated successfully', 'success');
    },
    onError: () => {
      showNotification('Failed to update settings', 'error');
    }
  });

  const updatePasswordMutation = useMutation({
    mutationFn: (data: PasswordUpdate) => settingsApi.updatePassword(data),
    onSuccess: () => {
      showNotification('Password updated successfully', 'success');
      resetPassword();
    },
    onError: () => {
      showNotification('Failed to update password', 'error');
    }
  });

  const handleAvatarUpload = async (file: File) => {
    try {
      await settingsApi.uploadAvatar(file);
      showNotification('Avatar updated successfully', 'success');
      queryClient.invalidateQueries({ queryKey: ['settings'] });
    } catch (error) {
      showNotification('Failed to upload avatar', 'error');
      throw error;
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Settings
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>
                Avatar
              </Typography>
              <FileUpload
                onUploadComplete={() => {}}
                accept={['image/*']}
                maxSize={5 * 1024 * 1024} // 5MB
              />
            </Box>
          </Paper>
        </Grid>

        {/* Theme & Display */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Theme & Display
            </Typography>
            <form onSubmit={handleSettingsSubmit((data) => updateSettingsMutation.mutate(data))}>
              <FormControlLabel
                control={
                  <Controller
                    name="theme"
                    control={settingsControl}
                    defaultValue={settings?.theme}
                    render={({ field }) => (
                      <Switch
                        {...field}
                        checked={field.value === 'dark'}
                        onChange={(e) => field.onChange(e.target.checked ? 'dark' : 'light')}
                      />
                    )}
                  />
                }
                label="Dark Mode"
              />
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Display Density</InputLabel>
                <Controller
                  name="displayPreferences.density"
                  control={settingsControl}
                  defaultValue={settings?.displayPreferences.density}
                  render={({ field }) => (
                    <Select {...field} label="Display Density">
                      <MenuItem value="comfortable">Comfortable</MenuItem>
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="standard">Standard</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save Display Settings
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <form onSubmit={handleSettingsSubmit((data) => updateSettingsMutation.mutate(data))}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="notifications.email"
                        control={settingsControl}
                        defaultValue={settings?.notifications.email}
                        render={({ field }) => (
                          <Switch {...field} checked={field.value} />
                        )}
                      />
                    }
                    label="Email Notifications"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Controller
                        name="notifications.push"
                        control={settingsControl}
                        defaultValue={settings?.notifications.push}
                        render={({ field }) => (
                          <Switch {...field} checked={field.value} />
                        )}
                      />
                    }
                    label="Push Notifications"
                  />
                </Grid>
              </Grid>
              <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Save Notification Settings
              </Button>
            </form>
          </Paper>
        </Grid>

        {/* Password Change */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Change Password
            </Typography>
            <form onSubmit={handlePasswordSubmit((data) => updatePasswordMutation.mutate(data))}>
              <Controller
                name="currentPassword"
                control={passwordControl}
                rules={{ required: 'Current password is required' }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Current Password"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="newPassword"
                control={passwordControl}
                rules={{ required: 'New password is required', minLength: { value: 8, message: 'Password must be at least 8 characters' } }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="New Password"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                name="confirmPassword"
                control={passwordControl}
                rules={{
                  required: 'Please confirm your password',
                  validate: (value, formValues) => value === formValues.newPassword || 'Passwords do not match'
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Confirm New Password"
                    fullWidth
                    margin="normal"
                    error={!!error}
                    helperText={error?.message}
                  />
                )}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                disabled={updatePasswordMutation.isPending}
              >
                {updatePasswordMutation.isPending ? 'Updating...' : 'Update Password'}
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsPage;