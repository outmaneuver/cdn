import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import { DashboardStats } from '@/types/api';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';

interface StatsCardsProps {
  stats?: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: PeopleIcon,
      color: '#1976d2',
    },
    {
      title: 'Total Content',
      value: stats?.contentMetrics.totalContent || 0,
      icon: ArticleIcon,
      color: '#2e7d32',
    },
    {
      title: 'Total Views',
      value: stats?.engagementMetrics.totalViews || 0,
      icon: VisibilityIcon,
      color: '#ed6c02',
    },
    {
      title: 'Active Users',
      value: stats?.userMetrics.activeUsers || 0,
      icon: TrendingUpIcon,
      color: '#9c27b0',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Icon sx={{ color: card.color, fontSize: 40, mr: 1 }} />
                <Typography color="textSecondary" variant="h6">
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="h4" component="div">
                {card.value.toLocaleString()}
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatsCards;