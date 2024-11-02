import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BioPage({ userId }) {
  const [bioData, setBioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBioData = async () => {
      try {
        const response = await axios.get(`/api/bio/${userId}`);
        setBioData(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching bio data');
        setLoading(false);
      }
    };

    fetchBioData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="bio-page">
      <img src={bioData.profilePicture} alt={`${bioData.name}'s profile`} />
      <h1>{bioData.name}</h1>
      <p>{bioData.bio}</p>
      <ul>
        {bioData.socialLinks.map((link, index) => (
          <li key={index}>
            <a href={link.url} target="_blank" rel="noopener noreferrer">
              {link.platform}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BioPage;
