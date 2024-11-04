// src/pages/Content/ContentList.tsx
import React from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { DataGrid } from '@mui/x-data-grid';
import { Button, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { contentApi } from '@/services/api';

export default function ContentList() {
  const { data, isLoading } = useQuery(['content'], contentApi.getAll);
  const deleteMutation = useMutation(contentApi.delete);

  const columns = [
    { field: 'title', headerName: 'Title', flex: 1 },
    { field: 'status', headerName: 'Status', width: 120 },
    { field: 'type', headerName: 'Type', width: 120 },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 120,
      renderCell: (params) => (
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
      rows={data?.data || []}
      columns={columns}
      loading={isLoading}
      autoHeight
    />
  );
}