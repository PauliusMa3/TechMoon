import React from 'react';
import styled from 'styled-components';
import Categories from '../components/Categories';
import { useAuth } from '../src/auth-context';

const HomePageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HomePage = ({ query }) => {
  const { isAuthenticated, user } = useAuth();
  console.log('Index Page IsAuthenticated: ', isAuthenticated);
  console.log('Index page User: ', user);
  return <Categories />;
};

export default HomePage;
