import { useState, useEffect } from 'react';
import api from '@/services/api';

interface Stats {
  profileViews: number;
  totalContent: number;
  lastActive: Date;
}

export function useStats() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get<Stats>('/user/stats');
        setStats(response.data);
      } catch (err) {
        setError('Failed to load stats');
        console.error('Error loading stats:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { stats, loading, error };
} 