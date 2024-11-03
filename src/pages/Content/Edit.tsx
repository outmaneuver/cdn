import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, TextField, Button, Paper, Typography, CircularProgress, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { fetchContentById, updateContent } from '../../services/api';
import { useNotification } from '../../contexts/NotificationContext';
import type { Content } from '../../types/api';

interface ContentForm {
  title: string;
  body: string;
  status: 'draft' | 'published';
  category?: string;
}

const ContentEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control, handleSubmit, reset } = useForm<ContentForm>();

  const { data: content, isLoading } = useQuery({
    queryKey: ['content', id],
    queryFn: () => fetchContentById(id!),
    enabled: !!id,
    onSuccess: (data) => {
      reset(data);
    },
  });

  const mutation = useMutation({
    mutationFn: (data: ContentForm) => updateContent(id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      showNotification({
        type: 'success',
        message: 'Content updated successfully',
      });
      navigate('/content');
    },
    onError: () => {
      showNotification({
        type: 'error',
        message: 'Failed to update content',
      });
    },
  });

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Edit Content
      </Typography>
      <Paper sx={{ p: 3 }}>
        <form onSubmit={handleSubmit((data) => mutation.mutate(data))}>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Title"
                fullWidth
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="body"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                label="Content"
                fullWidth
                multiline
                rows={6}
                margin="normal"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="status"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Status</InputLabel>
                <Select {...field} label="Status">
                  <MenuItem value="draft">Draft</MenuItem>
                  <MenuItem value="published">Published</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/content')}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default ContentEdit; 