import styled from 'styled-components';
import Link from 'next/link';
import React from 'react'

const StoreNameStyles = styled.div`
  display: inline-block;
  background: #00719c;
  position: relative;
  padding: 4px 5px;
  height: 40px;

  a {
    font-size: 1.75rem;
    margin: 0;
    z-index: 2;
    text-align: center;
    font-family: "Mont-bold";
    color: white;
  }

  transform: skew(-15deg);
`;

const StoreName = ({ size }) => (
  <StoreNameStyles size={size}>
    <Link href="/">
      <a>TechMoon</a>
    </Link>
  </StoreNameStyles>
);

export default StoreName;
