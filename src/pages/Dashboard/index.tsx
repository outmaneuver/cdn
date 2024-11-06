import React from 'react';
import { Grid, Box, Typography, Paper, CircularProgress, Container, Avatar } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { analyticsApi } from '@/services/api';
import { useAuth } from '@/hooks/useAuth';
import type { DashboardStats } from '@/types/api';
import StatsCards from '@/components/Dashboard/StatsCards';
import RecentActivityList from '@/components/Dashboard/RecentActivityList';
import QuickActions from '@/components/Dashboard/QuickActions';
import Chart from '@/components/Analytics/Chart';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: analyticsApi.getDashboardStats
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl">
      {/* Welcome Section */}
      <Box 
        sx={{ 
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          p: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 1
        }}
      >
        <Avatar
          src={user?.avatarUrl}
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Welcome back, {user?.name || 'User'}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Here's what's happening with your content today
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12}>
          <QuickActions />
        </Grid>

        {/* Stats Overview */}
        <Grid item xs={12}>
          <StatsCards stats={stats} />
        </Grid>

        {/* Main Content Area */}
        <Grid item xs={12} lg={8}>
          <Paper 
            sx={{ 
              p: 3, 
              height: '100%',
              minHeight: 400,
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              User Growth Trends
            </Typography>
            <Chart
              data={stats?.userMetrics.newUsers || []}
              dataKey="count"
              xAxisKey="date"
              color="#1976d2"
              title="User Growth Trends"
            />
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} lg={4}>
          <Paper 
            sx={{ 
              p: 3,
              height: '100%',
              minHeight: 400,
              maxHeight: 480,
              overflow: 'auto',
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              Recent Activity
            </Typography>
            <RecentActivityList activities={stats?.recentActivity || []} />
          </Paper>
        </Grid>

        {/* Additional Charts */}
        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              minHeight: 350,
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              Content Distribution
            </Typography>
            <Chart
              data={stats?.contentMetrics.contentByCategory || []}
              title="Content Distribution"
              dataKey="count"
              xAxisKey="category"
              color="#2e7d32"
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            sx={{ 
              p: 3,
              minHeight: 350,
              bgcolor: 'background.paper',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom>
              Popular Content
            </Typography>
            <Chart
              data={stats?.engagementMetrics.popularContent || []}
              title="Popular Content"
              dataKey="views"
              xAxisKey="title"
              color="#ed6c02"
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;