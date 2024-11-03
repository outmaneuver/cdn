import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography
} from '@mui/material';
import {
  Edit as EditIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { format } from 'date-fns';

interface Activity {
  id: string;
  action: string;
  timestamp: Date;
  userId?: string;
  contentId?: string;
}

interface RecentActivityListProps {
  activities: Activity[];
}

const RecentActivityList: React.FC<RecentActivityListProps> = ({ activities }) => {
  const getActivityIcon = (action: string) => {
    switch (action) {
      case 'create':
        return <AddIcon />;
      case 'update':
        return <EditIcon />;
      case 'delete':
        return <DeleteIcon />;
      default:
        return <PersonIcon />;
    }
  };

  return (
    <List>
      {activities.map((activity) => (
        <ListItem key={activity.id}>
          <ListItemAvatar>
            <Avatar>{getActivityIcon(activity.action)}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={activity.action}
            secondary={
              <Typography variant="body2" color="textSecondary">
                {format(new Date(activity.timestamp), 'PPp')}
              </Typography>
            }
          />
        </ListItem>
      ))}
    </List>
  );
};

export default RecentActivityList; 