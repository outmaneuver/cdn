import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Group as GroupIcon,
  Analytics as AnalyticsIcon,
} from '@mui/icons-material';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    {
      icon: <SpeedIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Fast & Efficient',
      description: 'Lightning-fast content management with real-time updates.',
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security with role-based access control.',
    },
    {
      icon: <GroupIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Team Collaboration',
      description: 'Work together seamlessly with team management features.',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />,
      title: 'Advanced Analytics',
      description: 'Detailed insights and analytics for your content performance.',
    },
  ];

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.primary.light} 90%)`,
    }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 6, md: 12 } }}>
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ color: 'white' }}>
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    fontWeight: 700,
                    mb: 3,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                  }}
                >
                  Content Management System
                </Typography>
                <Typography
                  variant="h5"
                  sx={{ mb: 4, textShadow: '1px 1px 2px rgba(0,0,0,0.1)' }}
                >
                  Transform your digital content workflow with our powerful and intuitive platform.
                </Typography>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/register')}
                    sx={{
                      bgcolor: 'white',
                      color: theme.palette.primary.main,
                      '&:hover': {
                        bgcolor: 'rgba(255,255,255,0.9)',
                      },
                    }}
                  >
                    Get Started
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/login')}
                    sx={{
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderColor: 'white',
                        bgcolor: 'rgba(255,255,255,0.1)',
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper
                elevation={6}
                sx={{
                  p: 3,
                  bgcolor: 'rgba(255,255,255,0.9)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: 2,
                }}
              >
                <img
                  src="/dashboard-preview.png"
                  alt="Dashboard Preview"
                  style={{ width: '100%', height: 'auto', borderRadius: 8 }}
                />
              </Paper>
            </Grid>
          </Grid>
        </Box>

        {/* Features Section */}
        <Box sx={{ py: 8 }}>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card
                  elevation={4}
                  sx={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    },
                  }}
                >
                  <CardContent sx={{ textAlign: 'center', flexGrow: 1 }}>
                    <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                    <Typography variant="h6" gutterBottom>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage; 