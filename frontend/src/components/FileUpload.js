import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [fileLength, setFileLength] = useState('');
  const [uploadPassword, setUploadPassword] = useState('');
  const [message, setMessage] = useState('');

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onFileLengthChange = (e) => {
    setFileLength(e.target.value);
  };

  const onUploadPasswordChange = (e) => {
    setUploadPassword(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileLength', fileLength);
    formData.append('uploadPassword', uploadPassword);

    try {
      const response = await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setMessage('File uploaded successfully');
    } catch (error) {
      setMessage('Error uploading file');
    }
  };

  return (
    <div className="file-upload">
      <h2>Upload File</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="file">File:</label>
          <input type="file" id="file" onChange={onFileChange} />
        </div>
        <div>
          <label htmlFor="fileLength">File Length:</label>
          <input
            type="number"
            id="fileLength"
            value={fileLength}
            onChange={onFileLengthChange}
          />
        </div>
        <div>
          <label htmlFor="uploadPassword">Upload Password:</label>
          <input
            type="password"
            id="uploadPassword"
            value={uploadPassword}
            onChange={onUploadPasswordChange}
          />
        </div>
        <button type="submit">Upload</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default FileUpload;
