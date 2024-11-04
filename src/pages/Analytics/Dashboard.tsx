// src/pages/Analytics/Dashboard.tsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Grid } from '@mui/material';
import {
  LineChart,
  BarChart,
  PieChart
} from '@/components/charts';
import { analyticsApi } from '@/services/api';
import { AnalyticsMetrics } from '@/types/api';

export default function Dashboard() {
  const { data: metrics } = useQuery<AnalyticsMetrics>({
    queryKey: ['analytics', 'dashboard'],
    queryFn: async () => {
      const response = await analyticsApi.getDashboardMetrics();
      return response.data;
    }
  });

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <LineChart
          data={metrics?.userGrowth}
          title="User Growth"
          xAxis="date"
          yAxis="count"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <BarChart
          data={metrics?.contentMetrics}
          title="Content by Type" 
          xAxis="type"
          yAxis="count"
        />
      </Grid>
      <Grid item xs={12}>
        <PieChart
          data={metrics?.engagement}
          title="User Engagement"
        />
      </Grid>
    </Grid>
  );
}