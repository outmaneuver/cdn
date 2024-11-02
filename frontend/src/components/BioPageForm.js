import React, { useState } from 'react';
import axios from 'axios';

function BioPageForm({ userId }) {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [socialLinks, setSocialLinks] = useState([{ platform: '', url: '' }]);
  const [profilePicture, setProfilePicture] = useState(null);
  const [message, setMessage] = useState('');

  const handleSocialLinkChange = (index, field, value) => {
    const newSocialLinks = [...socialLinks];
    newSocialLinks[index][field] = value;
    setSocialLinks(newSocialLinks);
  };

  const handleAddSocialLink = () => {
    setSocialLinks([...socialLinks, { platform: '', url: '' }]);
  };

  const handleRemoveSocialLink = (index) => {
    const newSocialLinks = socialLinks.filter((_, i) => i !== index);
    setSocialLinks(newSocialLinks);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('bio', bio);
    formData.append('socialLinks', JSON.stringify(socialLinks));
    formData.append('profilePicture', profilePicture);

    try {
      const response = await axios.post(`/api/bio/${userId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('Bio page saved successfully');
    } catch (error) {
      setMessage('Error saving bio page');
    }
  };

  return (
    <div className="bio-page-form">
      <h2>Create/Edit Bio Page</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Social Links:</label>
          {socialLinks.map((link, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="Platform"
                value={link.platform}
                onChange={(e) => handleSocialLinkChange(index, 'platform', e.target.value)}
                required
              />
              <input
                type="url"
                placeholder="URL"
                value={link.url}
                onChange={(e) => handleSocialLinkChange(index, 'url', e.target.value)}
                required
              />
              <button type="button" onClick={() => handleRemoveSocialLink(index)}>
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={handleAddSocialLink}>
            Add Social Link
          </button>
        </div>
        <div>
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="file"
            id="profilePicture"
            onChange={(e) => setProfilePicture(e.target.files[0])}
            required
          />
        </div>
        <button type="submit">Save Bio Page</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default BioPageForm;
