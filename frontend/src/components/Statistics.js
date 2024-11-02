import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Statistics() {
  const [statistics, setStatistics] = useState({
    totalFiles: 0,
    totalDataUsed: 0,
  });

  useEffect(() => {
    axios.get('/api/statistics')
      .then(response => setStatistics(response.data))
      .catch(error => console.error('Error fetching statistics:', error));
  }, []);

  return (
    <div className="statistics">
      <h2>Upload Statistics</h2>
      <p>Total Files: {statistics.totalFiles}</p>
      <p>Total Data Used: {statistics.totalDataUsed} bytes</p>
    </div>
  );
}

export default Statistics;
