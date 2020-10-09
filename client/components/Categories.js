import React from 'react';
import styled from 'styled-components';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from './Loading';
import Error from './ErrorCatcher';
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
  const { data, loading, error } = useQuery(FETCH_CATEGORIES);

  if (loading) return <Loading />;
  // if(error) return <Error error={error}/>

  return (
    <CategoriesStyles>
      {
                data.categories.map((category) => <Category category={category} />)

            }
    </CategoriesStyles>
  );
};

export default Categories;
