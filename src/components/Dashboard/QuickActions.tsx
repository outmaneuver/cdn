import React from 'react';
import { Grid, Paper, Button, Typography, Box } from '@mui/material';
import {
  Add as AddIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'New Content',
      icon: AddIcon,
      color: '#1976d2',
      onClick: () => navigate('/content/new'),
    },
    {
      title: 'Upload Files',
      icon: UploadIcon,
      color: '#2e7d32',
      onClick: () => navigate('/content/upload'),
    },
    {
      title: 'View Analytics',
      icon: AnalyticsIcon,
      color: '#ed6c02',
      onClick: () => navigate('/analytics'),
    },
    {
      title: 'Settings',
      icon: SettingsIcon,
      color: '#9c27b0',
      onClick: () => navigate('/settings'),
    },
  ];

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Quick Actions</Typography>
      </Box>
      <Grid container spacing={2}>
        {actions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Grid item xs={6} sm={3} key={index}>
              <Button
                variant="outlined"
                startIcon={<Icon />}
                onClick={action.onClick}
                fullWidth
                sx={{
                  borderColor: action.color,
                  color: action.color,
                  '&:hover': {
                    borderColor: action.color,
                    backgroundColor: `${action.color}10`,
                  },
                  height: '100%',
                  minHeight: 80,
                  flexDirection: 'column',
                  gap: 1,
                }}
              >
                {action.title}
              </Button>
            </Grid>
          );
        })}
      </Grid>
    </Paper>
  );
};

export default QuickActions;