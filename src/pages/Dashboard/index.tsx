import React from 'react';
import { Grid, Paper, Box, Typography, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';
import { fetchDashboardStats } from '@/services/api';
import { DashboardStats } from '@/types/api';
import RecentActivityList from '../../components/Dashboard/RecentActivityList';
import QuickActions from '../../components/Dashboard/QuickActions';
import StatsCards from '../../components/Dashboard/StatsCards';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Define the user distribution data type
interface UserDistributionData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats
  });

  // Transform userMetrics into pie chart data
  const userDistributionData: UserDistributionData[] = React.useMemo(() => {
    if (!stats?.userMetrics) return [];
    return [
      { name: 'Active Users', value: stats.userMetrics.activeUsers },
      { name: 'New Users', value: stats.userMetrics.newUsers.length }
    ];
  }, [stats?.userMetrics]);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Grid container spacing={3}>
        {/* Stats Cards */}
        <Grid item xs={12}>
          <StatsCards stats={stats} />
        </Grid>

        {/* Charts */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>Content Analytics</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stats?.contentMetrics.contentByCategory}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* User Distribution */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, height: '400px' }}>
            <Typography variant="h6" gutterBottom>User Distribution</Typography>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={userDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {userDistributionData.map((_entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Recent Activity</Typography>
            <RecentActivityList activities={stats?.recentActivity || []} />
          </Paper>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Quick Actions</Typography>
            <QuickActions />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 