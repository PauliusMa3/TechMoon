import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
import Page from '../components/layouts/PageLayout';
import withData from '../lib/ApolloClient';
import { AuthProvider } from '../context/auth-context';
import { CartProvider } from '../context/cart-context';
import React from 'react';

class MyApp extends App {
  render() {
    const {
      Component, pageProps, apollo, router,
    } = this.props;
    const mergedProps = { ...pageProps, router };

    return (
        <ApolloProvider client={apollo}>
            <AuthProvider>
                <CartProvider>
                    <Page>
                        <Component {...mergedProps} />
                    </Page>
                </CartProvider>
            </AuthProvider>
        </ApolloProvider>
    );
  }
}

export default withData(MyApp);
