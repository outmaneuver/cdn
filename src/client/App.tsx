import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/register" element={<div>Register Page</div>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App; 