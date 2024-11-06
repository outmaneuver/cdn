import React from 'react';
import { Box, Paper, Avatar, Typography, Button, Grid, TextField } from '@mui/material';

interface User {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

const Profile: React.FC = () => {
  // Mock user data - replace with actual auth context
  const user: User = {
    name: 'John Doe',
    email: 'john@example.com',
    avatarUrl: ''
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Implement profile update logic
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Profile Settings
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              src={user.avatarUrl}
              sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
            />
            <Typography variant="h6" gutterBottom>
              {user.name}
            </Typography>
            <Typography color="textSecondary" gutterBottom>
              {user.email}
            </Typography>
            <Button variant="outlined" sx={{ mt: 2 }}>
              Change Avatar
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    defaultValue={user.name}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    defaultValue={user.email}
                    disabled
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;