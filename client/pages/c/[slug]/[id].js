import React, {useEffect, useState} from 'react';
import {CATEGORY_PRODUCTS} from '../../../components/Category';
import gql from 'graphql-tag';
import Router from 'next/router';
import Loading from '../../../components/Loading';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import {perPage} from '../../../config';
import ProductGrid from '../../../components/ProductGrid';

const CategoryPageStyles = styled.div`
  padding: 1rem;
`

const CategoryPage = ({ router }) => {
  const categoryId = parseInt(router.query.id);
  const page = parseInt(router.query.page) || 1;
  const [pageloading, setLoading] = useState(false);

  const startLoading = () => setLoading(true);
  const stopLoading = () => setLoading(false);

  const { data, loading, error } = useQuery(CATEGORY_PRODUCTS, {
      variables: {
          categoryId: categoryId,
          limit: perPage,
          skip: (perPage * page) - perPage
      }
  });

   useEffect(() => {
       // Router event handler
       Router.events.on('routeChangeStart', startLoading);
       Router.events.on('routeChangeComplete', stopLoading);
       return () => {
           Router.events.off('routeChangeStart', startLoading);
           Router.events.off('routeChangeComplete', stopLoading);
       };
   }, []);


   if (loading || pageloading) {
       return <Loading />;
   }


  return (
    <CategoryPageStyles>
      {data?.categoryProducts?.products && <ProductGrid products={data.categoryProducts.products} />}
    </CategoryPageStyles>
  )
};


export default CategoryPage;
