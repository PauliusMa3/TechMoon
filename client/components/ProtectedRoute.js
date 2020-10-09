import React, { useEffect } from 'react';
import Router from 'next/router';
import { useAuth } from '../src/auth-context';

const ProtectedRoute = (Component) => {
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      Router.push('/sign');
    }
  }, [isAuthenticated, isLoading]);

  return (<Component {...arguments} />);
};

export default ProtectedRoute;
