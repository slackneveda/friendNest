
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Feed from '@/components/Feed';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  // If the user is not authenticated, redirect to home page
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="container mx-auto py-4 px-4">
        <Feed />
      </div>
    </div>
  );
};

export default Dashboard;
