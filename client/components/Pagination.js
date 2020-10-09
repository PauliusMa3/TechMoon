import React from "react";
import styled from "styled-components";
import Link from 'next/link';
import gql from 'graphql-tag';
import {useQuery} from "@apollo/react-hooks";
import {perPage} from '../config';
import slug from 'slug';

const PRODUCTS_AGGREGATE_QUERY = gql`
  query PRODUCTS_AGGREGATE_QUERY {
    products {
        count
    }
  }
`;

const PaginationStyles = styled.div`
  font-size: 1.2rem;

  a {
    &:disabled {
      opacity: 0.6;
      pointer-events: none;
    }
  }
`;

const Pagination = ({ page, totalItems, categoryId, categoryName }) => {
  const { data, loading } = useQuery(PRODUCTS_AGGREGATE_QUERY);


  if (loading) return <p>Loading...</p>;

  const totalPages = Math.ceil(totalItems / parseInt(1));

  return (
    <PaginationStyles>
      <Link href={`/c/${slug(categoryName)}/${categoryId}?page=${page - 1}`}>
        <a disabled={page === 1}>Previous</a>
      </Link>
      <p>
        Page {page} of {totalPages}
      </p>
      <Link
        href={`/c/${slug(categoryName)}/${categoryId}?page=${page + 1}`}
        disabled={page === totalPages}
      >
        <a aria-disabled={page === totalPages}>Next</a>
      </Link>
    </PaginationStyles>
  );
};

export default Pagination;
