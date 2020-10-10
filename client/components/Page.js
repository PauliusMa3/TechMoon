import React, { useEffect } from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import { useRouter } from 'next/router';
import Header from './Header';
import Footer from './Footer';
import { useCartDispatch } from '../src/cart-context';
import { useAuth } from '../src/auth-context';
import Cart from './Cart';

const theme = {
  colors: {
    primary: 'red',
    lightGrey: '#F0F0F0',
    secondaryGrey: '#bebebe',
    white: '#FFFFFF',
    black: '#151515',
    tertiaryBlue: '#0763e5',
    primaryBlue: '#0993f3',
    secondaryBlue: '#00719c',
    red: '#d24d5f',
    yellow: '#ffbf00',
    errorRed: '#d04f72',
    green: '#89c038',
  },
  maxWidth: '1300px',
  boxShadow: '0 6px 14px rgba(0,0,0,.1)',
};

const GlobalStyles = createGlobalStyle`
    html {
        box-sizing: 'border-box';
    }

    html,body {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

  *, *::before, *::after {
    box-sizing: border-box;
  }

      @font-face {
      font-family: 'Mont-bold';
      src: url('/Montserrat-Bold.ttf');
    }

    @font-face {
      font-family: 'Robo-regular';
      src: url('/Roboto-Regular.ttf');
    }

    a{
  text-decoration: none;
  }

`;

const Inner = styled.div`
  max-width: 1300px;
  margin: 0 auto;
  font-family: "Robo-regular";
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  box-sizing: border-box;
  min-height: 100vh;

  font-size: 62.5%;
`;

const CustomPage = styled.div`
  width: 100%;
  font-size: 62.5%;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
`;

const StyledPage = styled.div`
  background: ${(props) => props.theme.colors.white};
  width: 100%;
  height: 100%;
  font-size: 62.5%;
  position: relative;
  box-sizing: border-box;
`;

const Page = (props) => {
  const { fetchCart } = useCartDispatch();
  const router = useRouter();

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />

      <StyledPage>
        {router.pathname.includes('checkout') ? (
          <CustomPage>{props.children}</CustomPage>
        ) : (
          <Inner>
            <Cart />
            <Header />
            {props.children}
            <Footer />
          </Inner>
        )}
      </StyledPage>
    </ThemeProvider>
  );
};

export default Page;
