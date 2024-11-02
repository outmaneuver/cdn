import React, { useState } from 'react';
import axios from 'axios';

function Profile({ user }) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put('/api/user/password', { password });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>New Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default Profile;
