import React from 'react';
import axios from 'axios';

function FileList({ files, setFiles }) {
  const handleCopyUrl = (url) => {
    navigator.clipboard.writeText(url);
    alert('URL copied to clipboard');
  };

  const handleViewFile = (url) => {
    window.open(url, '_blank');
  };

  const handleDeleteFile = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this file?');
    if (!isConfirmed) {
      return;
    }

    try {
      await axios.delete(`/api/files/${id}`);
      setFiles(files.filter(file => file._id !== id));
      alert('File deleted successfully');
    } catch (error) {
      alert('Error deleting file');
    }
  };

  return (
    <div className="file-list">
      <h2>Your Uploads</h2>
      <ul>
        {files.map(file => (
          <li key={file._id}>
            <span>{file.fileName}</span>
            <button onClick={() => handleCopyUrl(file.url)}>Copy URL</button>
            <button onClick={() => handleViewFile(file.url)}>View</button>
            <button onClick={() => handleDeleteFile(file._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FileList;
