import React from 'react';
import styled from 'styled-components';
import slug from 'slug';
import Router from 'next/router';
import gql from 'graphql-tag';
import formatMoney from '../utils/formatMoney';
import AddToCartButton from './AddToCartButton';

export const productsQuery = gql`
  query PRODUCTS($searchTerm: String, $isProductSearch: Boolean) {
    products(searchTerm: $searchTerm, isProductSearch: $isProductSearch) {
      id
      name
      price
      description
      sku
      image
    }
  }
`;

const ProductsContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    padding: 1rem;
    overflow-x: auto;
    scroll-behavior: smooth;
    grid-gap: 1rem;
    object-fit: cover;

    .product_image {
        background-size: contain;
        background-repeat: no-repeat;
        width: 120px;
        height: 120px;
        background-position: 50% 50%;
    }
`;

const ProductCard = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.6rem 0.4rem;
  max-height: 500px;
`;

const ProductTitle = styled.p`
  text-align: center;
  font-size: 1.2rem;
  margin: 0.7rem 0;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 250px;
`;

const ProductPrice = styled.span`
  font-size: 1.5rem;
  color: ${(props) => props.theme.black};
  letter-spacing: 0.1em;
  font-family: 'Mont-bold';
  margin-bottom: 0.7rem;
`;

const Products = ({ products }) => (
  <ProductsContainer>
    {products.map((product) => (
      <ProductCard
        key={product.id}
        onClick={() => {
          const productNameSlug = slug(product.name);
          Router.push({
            pathname: `/product/${productNameSlug}`,
            query: {
              id: product.id,
            },
          });
        }}
      >
        <img src={product.image} className="product_image" alt={product.name} />
        <ProductTitle>{product.name}</ProductTitle>
        <ProductPrice>{formatMoney(product.price)}</ProductPrice>
        <AddToCartButton productId={product.id} product={product} />
      </ProductCard>
    ))}
  </ProductsContainer>
);

export default Products;
