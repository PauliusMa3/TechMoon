import React from 'react';
import styled from 'styled-components';
import StoreName from '../StoreName/StoreName';
import Search from '../Search/SearchItem';
import Nav from '../Nav';

const Container = styled.div`
  width: 100%;
  height: 10vh;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  display: grid;
  grid-template-columns: repeat(3, auto);
  align-items: center;
  padding: 0.5rem;
  top: 0;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const Header = () => {
  return (
    <Container>
      <StoreName />
      <Search />
      <Nav />
    </Container>
  );
};

export default Header;
