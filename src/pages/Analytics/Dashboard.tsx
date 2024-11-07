// src/pages/Analytics/Dashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { Grid, CircularProgress } from '@mui/material';
import Chart from '@/components/Analytics/Chart';
import { analyticsApi } from '@/services/api';
import type { AnalyticsData } from '@/types/api';

export default function Dashboard() {
  const { data: metrics, isLoading, error } = useQuery<AnalyticsData>({
    queryKey: ['analytics', 'dashboard'],
    queryFn: async () => {
      const response = await analyticsApi.getAnalytics();
      return response;
    }
  });

  if (isLoading) {
    return (
      <Grid container justifyContent="center">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) {
    return (
      <Grid container justifyContent="center">
        <div>Error loading dashboard data</div>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Chart
          data={metrics?.userMetrics?.newUsers ?? []}
          title="User Growth"
          dataKey="count"
          xAxisKey="date"
          color="#1976d2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Chart
          data={metrics?.contentMetrics?.contentByCategory ?? []}
          title="Content by Type"
          dataKey="count"
          xAxisKey="category"
          color="#2e7d32"
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          data={metrics?.engagementMetrics.popularContent || []}
          title="User Engagement"
          dataKey="views"
          xAxisKey="title"
          color="#ed6c02"
        />
      </Grid>
    </Grid>
  );
}