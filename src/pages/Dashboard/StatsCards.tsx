import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  Article as ArticleIcon,
  Person as PersonIcon,
  Visibility as VisibilityIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { DashboardStats } from '@/types/api';

interface StatsCardsProps {
  stats?: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Content',
      value: stats?.totalContent || 0,
      icon: ArticleIcon,
      color: '#1976d2'
    },
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: PersonIcon,
      color: '#2e7d32'
    },
    {
      title: 'Total Views',
      value: stats?.engagementMetrics?.totalViews || 0,
      icon: VisibilityIcon,
      color: '#ed6c02'
    },
    {
      title: 'Active Users',
      value: stats?.userMetrics?.activeUsers || 0,
      icon: TrendingUpIcon,
      color: '#9c27b0'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} sm={6} md={3} key={card.title}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 140,
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: -10,
                right: -10,
                opacity: 0.2,
                transform: 'rotate(30deg)'
              }}
            >
              <card.icon sx={{ fontSize: 100, color: card.color }} />
            </Box>
            <Typography color="textSecondary" variant="overline" gutterBottom>
              {card.title}
            </Typography>
            <Typography variant="h4" component="div" sx={{ color: card.color }}>
              {card.value.toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards; 