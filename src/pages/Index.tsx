
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import LandingPage from '@/components/LandingPage';
import { Navigate } from 'react-router-dom';

const Index = () => {
  const { isAuthenticated } = useAuth();

  // If the user is already authenticated, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <LandingPage />;
};

export default Index;
