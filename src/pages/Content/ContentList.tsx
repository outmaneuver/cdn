// src/pages/Content/ContentList.tsx
import React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { contentApi } from '@/services/api';
import { useNavigate } from 'react-router-dom';
import type { Content } from '@/types/api';

export default function ContentList() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: content = [], isLoading } = useQuery({
    queryKey: ['content'],
    queryFn: contentApi.getAll
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => contentApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['content'] });
    }
  });

  const columns: GridColDef[] = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params: { row: Content }) => (
        <>
          <IconButton onClick={() => navigate(`/content/edit/${params.row.id}`)}>
            <Edit />
          </IconButton>
          <IconButton onClick={() => deleteMutation.mutate(params.row.id)}>
            <Delete />
          </IconButton>
        </>
      )
    }
  ];

  return (
    <DataGrid
      rows={content || []}
      columns={columns}
      loading={isLoading}
      autoHeight
    />
  );
}