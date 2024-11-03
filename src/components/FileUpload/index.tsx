import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, CircularProgress } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import { uploadFile, UploadResponse } from '../../services/upload';
import { useNotification } from '../../contexts/NotificationContext';

interface FileUploadProps {
  onUploadComplete: (file: UploadResponse) => void;
  onUploadError?: (error: Error) => void;
  accept?: string[];
  maxSize?: number;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onUploadComplete,
  onUploadError,
  accept = ['image/*', 'application/pdf'],
  maxSize = 5242880, // 5MB
}) => {
  const [uploading, setUploading] = React.useState(false);
  const { showNotification } = useNotification();

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setUploading(true);
      const file = acceptedFiles[0];
      const response = await uploadFile(file);
      onUploadComplete(response);
      showNotification('File uploaded successfully', 'success');
    } catch (error) {
      console.error('Upload error:', error);
      onUploadError?.(error as Error);
      showNotification('Failed to upload file', 'error');
    } finally {
      setUploading(false);
    }
  }, [onUploadComplete, onUploadError, showNotification]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: accept.reduce((acc, curr) => ({ ...acc, [curr]: [] }), {}),
    maxSize,
    multiple: false,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed',
        borderColor: isDragActive ? 'primary.main' : 'grey.300',
        borderRadius: 2,
        p: 3,
        textAlign: 'center',
        cursor: 'pointer',
        bgcolor: isDragActive ? 'action.hover' : 'background.paper',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      }}
    >
      <input {...getInputProps()} />
      {uploading ? (
        <CircularProgress size={24} />
      ) : (
        <>
          <CloudUpload sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          <Typography>
            {isDragActive
              ? 'Drop the file here'
              : 'Drag and drop a file here, or click to select'}
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Maximum file size: {maxSize / 1024 / 1024}MB
          </Typography>
        </>
      )}
    </Box>
  );
};

export default FileUpload; 