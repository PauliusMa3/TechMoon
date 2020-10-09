import React from 'react';
import styled from 'styled-components';
import Search from './Search';
import StoreName from './StoreName';
import Nav from './Nav';
import Cart, {LOCAL_CART_QUERY} from './Cart';
import SearchItem from './SearchItem';

import {useQuery} from '@apollo/react-hooks'



const Container = styled.div`
  width: 100%;
  height: 110px;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  padding: 0.5rem;
  top:0;
  justify-content: space-between;
  /* overflow: hidden; */
  align-items: center;
  position: relative;
`;


const Header = () => {
  const { data } = useQuery(LOCAL_CART_QUERY);
    return (
      <Container>
        <StoreName />
        <SearchItem />
        <Nav />
        {data.cartOpen && <Cart />}
      </Container>
    );

}

export default Header;