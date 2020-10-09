import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Products from "./Products";
import Loading from "./Loading";
import Error from './ErrorCatcher';
import Pagination from "./Pagination";
import { perPage } from "../config";

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

const CategoryProducts = ({ categoryId, limit = 10, displayAllItems, page }) => {


  const { data, loading, error } = useQuery(CATEGORY_PRODUCTS, {
    variables: {
      categoryId,
      limit: 1,
      skip: displayAllItems ? (page * perPage) - perPage : 0
    },
  });

  if(loading) return (<Loading />)

  if (!data) return <p>No Product has been found in this category!</p>;
    return (
      <div>
        {/* {displayAllItems && (
          <Pagination
            page={page}
            totalItems={data.categoryProducts.count}
            categoryId={data.categoryProducts.categoryId}
            categoryName={data.categoryProducts.categoryName}
          />
        )} */}
        <Products products={data.categoryProducts.products || []} />
        {displayAllItems && (
          <Pagination
            page={page}
            totalItems={data.categoryProducts.count}
            categoryId={data.categoryProducts.categoryId}
            categoryName={data.categoryProducts.categoryName}
          />
        )}
      </div>
    );
};

export default CategoryProducts;
