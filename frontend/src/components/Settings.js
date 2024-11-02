import React, { useState } from 'react';
import axios from 'axios';

function Settings({ user }) {
  const [fileLength, setFileLength] = useState(user.uploadSettings.fileLength);
  const [uploadPassword, setUploadPassword] = useState(user.uploadSettings.uploadPassword);
  const [message, setMessage] = useState('');

  const handleSettingsChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/upload-settings', { fileLength, uploadPassword });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Settings</h2>
      <form onSubmit={handleSettingsChange}>
        <div>
          <label>File Length:</label>
          <input
            type="number"
            value={fileLength}
            onChange={(e) => setFileLength(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Password:</label>
          <input
            type="password"
            value={uploadPassword}
            onChange={(e) => setUploadPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Save Settings</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Settings;
