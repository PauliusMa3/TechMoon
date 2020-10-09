import React, {useState, useRef, useEffect, useLayoutEffect} from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import {useRouter} from 'next/router'
import styled from 'styled-components';
import AddToCart from '../components/AddToCartButton';
import TabManager from './TabManager';
import ProductDescription from './ProductDescription';
import Reviews from './Reviews';
import Loading from './Loading';
import formatMoney from '../utils/formatMoney';
import scrollToRef from './scrollToRef';
import {TabManagerStyles} from './styles/TabManagerStyles';

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
`

const ProductSideBarBlock = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
`

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
  color: ${props => props.theme.colors.red};

  .cents {
    font-size: 0.8rem;
  }
`

const Product = () => {

const router =useRouter();

const [activeTab, handleTab] = useState(0);

  const {data, loading, error} = useQuery(PRODUCT_QUERY, {
    variables: {
      id: router.query.id
  }});

  const productDescriptionRef = useRef(null);

  if(loading) return(<Loading />)

  if(!data) return null;

  const TABS = [
    { label: "description", value: 0, content: ProductDescription },
    { label: "specifications", value: 1, content: ProductDescription },
    { label: `reviews (${data && data.product.reviewsCount})`, value: 2, content: ProductDescription },
  ];

  const {label: activeLabel} = TABS[activeTab];


    const scrollTo = () => {
      if (productDescriptionRef && productDescriptionRef.current) {
        window.scroll({
          top: productDescriptionRef.current.offsetTop,
          behavior: "smooth",
        });
      }
    };

    // useLayoutEffect(() => {
    //   // const rect = productDescriptionRef.current.getBoundingClientRect();
    //   console.log("Input dimensions:", productDescriptionRef);
    // }, [productDescriptionRef]);


  // useLayoutEffect(() => {
  //     window.scroll({
  //       top: 150,
  //       behavior: "smooth",
  //     });
  // }, [])

  // useEffect(() => {
  //   console.log('hey')
  //       // window.scroll({
  //       //   top: productDescriptionRef.current.offsetTop,
  //       //   behavior: "smooth",
  //       // });

  // }, [activeTab])


  console.log("productDescriptionRef", productDescriptionRef);

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
                  console.log("productDescriptionRef", productDescriptionRef);
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
        {/* <TabManager tabs={TABS} handleTab={handleTab} activeTab={activeTab} /> */}
        <TabManagerStyles>
          {TABS.map((tab) => (
            <div
              key={tab.value}
              className={`tab ${activeTab === tab.value ? "selected-tab" : ""}`}
              onClick={() => {
                handleTab(tab.value);
                if (tab.label.startsWith("review")) {
                  router.push(`${router.asPath}#${tab.label}`);
                } else {
                  typeof window === "undefined"
                    ? null
                    : scrollToRef(productDescriptionRef)
                  // scrollTo(productDescriptionRef);
                }
              }}
            >
              {tab.label}
            </div>
          ))}
        </TabManagerStyles>
        )
        <div className="tab-content">
          {activeLabel.startsWith("reviews") && (
            <Reviews
              productId={data.product.id}
              reviewsCount={data.product.reviewsCount}
            />
          )}
        </div>
        {!activeLabel.startsWith("reviews") && (
          <ProductDescription
            data={data.product.description}
            ref={productDescriptionRef}
          />
        )}
      </ProductStyles>
    );
};

export default Product;
