import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  People as PeopleIcon,
  Article as ArticleIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material';
import { DashboardStats } from '@/types/api';

interface StatsCardsProps {
  stats?: DashboardStats;
}

const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  const cards = [
    {
      title: 'Total Users',
      value: stats?.userMetrics.totalUsers || 0,
      icon: PeopleIcon,
      color: '#1976d2',
      trend: '+12%',
    },
    {
      title: 'Published Content',
      value: stats?.contentMetrics.publishedContent || 0,
      icon: ArticleIcon,
      color: '#2e7d32',
      trend: '+5%',
    },
    {
      title: 'Total Views',
      value: stats?.engagementMetrics.totalViews || 0,
      icon: VisibilityIcon,
      color: '#ed6c02',
      trend: '+18%',
    },
    {
      title: 'Active Users',
      value: stats?.userMetrics.activeUsers || 0,
      icon: TrendingUpIcon,
      color: '#9c27b0',
      trend: '+7%',
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
                p: 2.5,
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: `${card.color}08`,
                border: 1,
                borderColor: `${card.color}20`,
                transition: 'transform 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box>
                  <Typography color="text.secondary" variant="subtitle2" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="h4" component="div" fontWeight="bold">
                    {card.value.toLocaleString()}
                  </Typography>
                </Box>
                <Icon
                  sx={{
                    fontSize: 40,
                    color: card.color,
                    opacity: 0.8,
                  }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  color: 'success.main',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5,
                }}
              >
                <TrendingUpIcon fontSize="small" />
                {card.trend} from last month
              </Typography>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default StatsCards;