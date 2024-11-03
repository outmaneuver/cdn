import React from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  Divider,
} from '@mui/material';
import {
  Description as ContentIcon,
  Person as UserIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

interface SearchResult {
  id: string;
  title?: string;
  name?: string;
  email?: string;
  createdAt?: string;
  type: 'content' | 'user';
}

interface SearchResultsProps {
  results: SearchResult[];
  onResultClick: (result: SearchResult) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onResultClick }) => {
  if (results.length === 0) {
    return (
      <Paper sx={{ p: 2, mt: 2 }}>
        <Typography color="textSecondary">No results found</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ mt: 2 }}>
      <List>
        {results.map((result, index) => (
          <React.Fragment key={result.id}>
            {index > 0 && <Divider />}
            <ListItem button onClick={() => onResultClick(result)}>
              <ListItemAvatar>
                <Avatar>
                  {result.type === 'content' ? <ContentIcon /> : <UserIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={result.title || result.name}
                secondary={
                  <>
                    {result.type === 'content' && result.createdAt && (
                      <Typography variant="caption" component="span">
                        Created {format(new Date(result.createdAt), 'PPP')}
                      </Typography>
                    )}
                    {result.type === 'user' && result.email && (
                      <Typography variant="caption" component="span">
                        {result.email}
                      </Typography>
                    )}
                  </>
                }
              />
            </ListItem>
          </React.Fragment>
        ))}
      </List>
    </Paper>
  );
};

export default SearchResults; 