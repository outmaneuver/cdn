import React from 'react';
import { Grid, Button } from '@mui/material';
import {
  Add as AddIcon,
  Upload as UploadIcon,
  Settings as SettingsIcon,
  People as PeopleIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  const actions = [
    {
      label: 'New Content',
      icon: <AddIcon />,
      onClick: () => navigate('/content/new'),
      color: 'primary'
    },
    {
      label: 'Upload Files',
      icon: <UploadIcon />,
      onClick: () => navigate('/upload'),
      color: 'secondary'
    },
    {
      label: 'Settings',
      icon: <SettingsIcon />,
      onClick: () => navigate('/settings'),
      color: 'info'
    },
    {
      label: 'Users',
      icon: <PeopleIcon />,
      onClick: () => navigate('/users'),
      color: 'success'
    }
  ];

  return (
    <Grid container spacing={2}>
      {actions.map((action) => (
        <Grid item xs={12} sm={6} key={action.label}>
          <Button
            variant="contained"
            color={action.color as any}
            startIcon={action.icon}
            onClick={action.onClick}
            fullWidth
            sx={{ py: 1.5 }}
          >
            {action.label}
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};

export default QuickActions; 