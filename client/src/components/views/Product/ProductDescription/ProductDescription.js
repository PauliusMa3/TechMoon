import React from 'react';
import styled from 'styled-components';

const ProductDescriptionStyles = styled.div`
    padding: 1rem;
    height: 100vh;
    
    p {
        font-size: 1rem;
        letter-spacing: 1.5;
        line-height: 1.5;
    }

    h2 {
        font-family: 'Mont-bold';
        font-size: 1.2rem;
    }
`;

const ProductDescription = ({ data }) => (
  <ProductDescriptionStyles>
    <h2>Product Description</h2>
    <p>{data}</p>
  </ProductDescriptionStyles>
);

export default ProductDescription;
