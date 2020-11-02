import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import slug from 'slug';
import gql from 'graphql-tag';
import {useQuery} from '@apollo/react-hooks';
import Products from './Products';
import Loading from './Loading';
import ErrorBanner from './ErrorBanner';

export const CATEGORY_PRODUCTS = gql`
    query CATEGORY_PRODUCTS($categoryId: Int, $limit: Int, $skip: Int) {
        categoryProducts(categoryId: $categoryId, limit: $limit, skip: $skip) {
            categoryId
            categoryName
            count
            products {
                id
                name
                price
                description
                sku
                image
            }
        }
    }
`;

const CategoryStyles = styled.div`
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    padding: 1rem;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
    overflow-x: auto;

    a {
        font-family: 'Mont-bold';
        font-size: 1.2rem;
        color: ${(props) => props.theme.colors.black};

        &:hover {
            color: ${(props) => props.theme.colors.secondaryBlue};
        }
    }

    p {
     font-size: 1rem;
    }
`;

const Category = ({ category }) => {

    const { data, loading, error } = useQuery (CATEGORY_PRODUCTS, {
    variables: {
        categoryId: category.id,
        limit: 5,
        skip: 0
    }
    });
  const queryString = '/c/[slug]/[id]?page=1';
  return (
      <CategoryStyles>
          <Link
              href={queryString}
              as={`/c/${slug(category.name)}/${category.id}?page=1`}
          >
              <a>{category.name}</a>
          </Link>
          {error && <ErrorBanner error={'Failed to fetch category products'} />}
          {loading && <Loading />}
          {data?.categoryProducts?.products ?<Products products={data?.categoryProducts?.products} /> : <p>No products found for this category</p>}
          
      </CategoryStyles>
  );
};

export default Category;
