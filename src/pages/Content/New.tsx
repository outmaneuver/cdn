// src/pages/Content/New.tsx
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { contentApi } from '@/services/api';
import { useNotification } from '@/contexts/NotificationContext';

interface ContentForm {
  title: string;
  body: string;
  status: 'draft' | 'published';
  category?: string;
}

export default function NewContent() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { showNotification } = useNotification();
  const { control, handleSubmit } = useForm<ContentForm>({
    defaultValues: {
      status: 'draft'
    }
  });

  const mutation = useMutation({
    mutationFn: contentApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
      showNotification('Content created successfully', 'success');
      navigate('/content');
    },
    onError: () => {
      showNotification('Failed to create content', 'error');
    }
  });

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Create New Content
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
            name="category"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth margin="normal">
                <InputLabel>Category</InputLabel>
                <Select {...field} label="Category">
                  <MenuItem value="blog">Blog</MenuItem>
                  <MenuItem value="news">News</MenuItem>
                  <MenuItem value="tutorial">Tutorial</MenuItem>
                </Select>
              </FormControl>
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
              Create Content
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
}