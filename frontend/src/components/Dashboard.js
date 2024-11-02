import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FileUpload from './FileUpload';
import FileList from './FileList';
import Statistics from './Statistics';
import Profile from './Profile';
import Settings from './Settings';

function Dashboard() {
  const [files, setFiles] = useState([]);
  const [statistics, setStatistics] = useState({});
  const [user, setUser] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch user data
    axios.get('/api/user')
      .then(response => setUser(response.data))
      .catch(error => setMessage('Error fetching user data'));

    // Fetch user files
    axios.get('/api/files')
      .then(response => setFiles(response.data))
      .catch(error => setMessage('Error fetching files'));

    // Fetch user statistics
    axios.get('/api/statistics')
      .then(response => setStatistics(response.data))
      .catch(error => setMessage('Error fetching statistics'));
  }, []);

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {message && <p>{message}</p>}
      <Profile user={user} />
      <Settings user={user} />
      <Statistics statistics={statistics} />
      <FileUpload />
      <FileList files={files} setFiles={setFiles} />
    </div>
  );
}

export default Dashboard;
