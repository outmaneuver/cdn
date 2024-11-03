import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Typography,
  Box,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { DashboardStats } from '@/types/api';

interface RecentActivityListProps {
  activities?: DashboardStats['recentActivity'];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities = [] }) => {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <AddIcon color="success" />;
      case 'update':
        return <EditIcon color="primary" />;
      case 'delete':
        return <DeleteIcon color="error" />;
      default:
        return <EditIcon />;
    }
  };

  const getActivityText = (activity: DashboardStats['recentActivity'][0]) => {
    const action = activity.action.charAt(0).toUpperCase() + activity.action.slice(1);
    return `${action} operation performed`;
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Recent Activity</Typography>
      </Box>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemIcon>{getActivityIcon(activity.action)}</ListItemIcon>
            <ListItemText
              primary={getActivityText(activity)}
              secondary={formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
            />
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default RecentActivityList;