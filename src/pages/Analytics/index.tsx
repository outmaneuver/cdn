import React from 'react';
import { Grid, CircularProgress, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '@/services/api';
import Chart from '@/components/Analytics/Chart';
import type { AnalyticsData } from '@/types/api';

const Analytics: React.FC = () => {
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics
  });

  if (isLoading) return <CircularProgress />;

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Chart
          data={data?.userMetrics.newUsers || []}
          title="New Users Over Time"
          dataKey="count"
          color="#1976d2"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Chart
          data={data?.contentMetrics.contentByCategory || []}
          title="Content by Category"
          dataKey="count"
          color="#2e7d32"
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          data={data?.engagementMetrics.popularContent || []}
          title="Popular Content"
          dataKey="views"
          xAxisKey="title" 
          color="#ed6c02"
        />
      </Grid>
    </Grid>
  );
};

export default Analytics;