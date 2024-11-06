import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { WebSocketProvider } from './contexts/WebSocketContext';

// Lazy load pages
const LandingPage = React.lazy(() => import('./pages/LandingPage'));
const Login = React.lazy(() => import('./pages/Auth/Login'));
const Register = React.lazy(() => import('./pages/Auth/Register'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const ContentList = React.lazy(() => import('./pages/Content/List'));
const ContentNew = React.lazy(() => import('./pages/Content/New'));
const ContentEdit = React.lazy(() => import('./pages/Content/Edit'));
const Analytics = React.lazy(() => import('./pages/Analytics'));
const Settings = React.lazy(() => import('./pages/Settings'));
const Profile = React.lazy(() => import('./pages/Profile'));

const LoadingFallback = () => (
  <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
    <CircularProgress />
  </Box>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <WebSocketProvider>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                {/* Public routes outside of Layout */}
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                
                {/* Protected routes with Layout */}
                <Route path="/" element={<Layout />}>
                  <Route path="dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="content" element={
                    <ProtectedRoute>
                      <ContentList />
                    </ProtectedRoute>
                  } />
                  <Route path="content/new" element={
                    <ProtectedRoute>
                      <ContentNew />
                    </ProtectedRoute>
                  } />
                  <Route path="content/edit/:id" element={
                    <ProtectedRoute>
                      <ContentEdit />
                    </ProtectedRoute>
                  } />
                  <Route path="analytics" element={
                    <ProtectedRoute>
                      <Analytics />
                    </ProtectedRoute>
                  } />
                  <Route path="settings" element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } />
                  <Route path="profile" element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  } />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </WebSocketProvider>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
};

export default App;