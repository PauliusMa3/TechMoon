import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import AddToCart from './AddToCartButton';
import ProductDescription from './ProductDescription';
import Reviews from './Reviews';
import Loading from './Loading';
import formatMoney from '../utils/formatMoney';
import {Tabs, Tab} from './Tabs/Tabs';

const PRODUCT_QUERY = gql`
  query PRODUCT_QUERY($id: ID!) {
    product(id: $id){
      id 
      name,
      price,
      description 
      sku,
      reviewsCount,
      image
      }
  }
`;

const ProductStyles = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProductHeroStyles = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  padding: 2rem;
`;

const ProductSideBar = styled.div`
padding: 2rem;
  display: flex;
  flex-direction: column;

  h1 {
    text-align: center;
    font-size: 1.5rem
  }
`;

const ProductSideBarBlock = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`;

const ProductImage = styled.div`

  height: 100%;

  img {
    object-fit: cover;
    height: 600px;
    width: 100%;
  }
`;

const ProductPriceValue = styled.span`
  font-family: 'Mont-bold';
  font-size: 1.7rem;
  color: ${(props) => props.theme.colors.red};

  .cents {
    font-size: 0.8rem;
  }
`;

const Product = () => {
  const router = useRouter();

  const { data, loading, error } = useQuery(PRODUCT_QUERY, {
    variables: {
      id: router.query.id,
    },
  });

  if (loading) return (<Loading />);

  if (!data) return null;

  return (
      <ProductStyles>
          <ProductHeroStyles>
              <ProductImage>
                  <img
                      src={data.product.image}
                      className="product_image"
                      alt={data.product.name}
                  />
              </ProductImage>
              <ProductSideBar>
                  <ProductSideBarBlock>
                      <h1>{data.product.name}</h1>
                  </ProductSideBarBlock>
                  <ProductSideBarBlock>
                      <ProductPriceValue
                          onClick={(productDescriptionRef) => {
                              console.log(
                                  'productDescriptionRef',
                                  productDescriptionRef
                              );
                              scrollTo(productDescriptionRef);
                          }}
                      >
                          {formatMoney(data.product.price)}
                      </ProductPriceValue>
                  </ProductSideBarBlock>
                  <ProductSideBarBlock>
                      <AddToCart productId={data.product.id} />
                  </ProductSideBarBlock>
              </ProductSideBar>
          </ProductHeroStyles>

          <Tabs>
              <Tab label='description' tabName={'description'}>
                  <ProductDescription data={data.product.description} />
              </Tab>
              <Tab label={'specifications'} tabName={'specifications'}>
                  <ProductDescription data={data.product.description} />
              </Tab>
              <Tab label={'reviews'} tabName={`reviews (${data && data.product.reviewsCount})`}>
                  <Reviews />
              </Tab>
          </Tabs>
      </ProductStyles>
  );
};

export default Product;