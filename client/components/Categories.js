import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from './Loading';
import Category from './Category';

const FETCH_CATEGORIES = gql`
  query {
    categories {
      id
      name
      description
    }
  }
`;

const CategoriesStyles = styled.div`
  margin: 2rem 0;
  width: 100%;
`;

const Categories = () => {
  const { data, loading } = useQuery(FETCH_CATEGORIES);
  if (loading) return <Loading />;

  return (
    <CategoriesStyles>
      {
        data.categories.map((category) => <Category key={category.id} category={category} />)
      }
    </CategoriesStyles>
  );
};

export default Categories;
