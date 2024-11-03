import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#9146FF', // Purple color from the image
      light: '#B9A3E3',
      dark: '#462B8C',
    },
    background: {
      default: '#0E0E10', // Dark background from the image
      paper: '#1F1F23', // Slightly lighter dark for cards
    },
    text: {
      primary: '#EFEFF1',
      secondary: '#ADADB8',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1F1F23',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 4,
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1F1F23',
          borderRadius: 8,
        },
      },
    },
  },
}); 