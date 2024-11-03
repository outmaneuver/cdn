import React from 'react';
import { Grid, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchAnalytics } from '../../services/api';
import type { AnalyticsData } from '../../types/api';
import Chart from '../../components/Analytics/Chart';

const Analytics: React.FC = () => {
  const { data, isLoading } = useQuery<AnalyticsData>({
    queryKey: ['analytics'],
    queryFn: fetchAnalytics,
  });

  if (isLoading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Chart
          data={data?.userMetrics.newUsers || []}
          title="New Users Over Time"
          dataKey="count"
          xAxisKey="date"
          color="#2196f3"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <Chart
          data={data?.contentMetrics.contentByCategory || []}
          title="Content by Category"
          dataKey="count"
          xAxisKey="category"
          color="#f50057"
        />
      </Grid>
      <Grid item xs={12}>
        <Chart
          data={data?.engagementMetrics.popularContent || []}
          title="Popular Content"
          dataKey="views"
          xAxisKey="title"
          color="#4caf50"
        />
      </Grid>
    </Grid>
  );
};

export default Analytics; 