import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Typography, Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { fetchContent } from '../../services/api';
import { useNavigate } from 'react-router-dom';
import type { Content } from '../../types/api';
import { format } from 'date-fns';

const ContentList: React.FC = () => {
  const navigate = useNavigate();
  const { data: content = [], isLoading } = useQuery<Content[]>({
    queryKey: ['content'],
    queryFn: fetchContent
  });

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { 
      field: 'createdAt', 
      headerName: 'Created', 
      flex: 1,
      valueFormatter: (params) => format(new Date(params.value), 'PPP')
    },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <Button onClick={() => navigate(`/content/${params.row.id}`)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">
          Content Management
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/content/new')}
        >
          Create New
        </Button>
      </Box>
      <DataGrid
        rows={content}
        columns={columns}
        autoHeight
        loading={isLoading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
      />
    </Box>
  );
};

export default ContentList; 