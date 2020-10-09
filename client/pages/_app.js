import App from 'next/app';
import Page from '../components/Page';
import withData from '../lib/ApolloClient'; 
import {ApolloProvider} from '@apollo/react-hooks';
import {ApolloProvider as OldApolloProvider} from '@apollo/client'
import {AuthProvider} from '../src/auth-context';
import {CartProvider} from '../src/cart-context';
class MyApp extends App {
  render() {
    const { Component, pageProps, apollo, router } = this.props
    const mergedProps = {...pageProps, router};

    return (
      <AuthProvider>
        <ApolloProvider client={apollo}>
          <CartProvider>
            <Page>
              <Component {...mergedProps} />
            </Page>
          </CartProvider>
        </ApolloProvider>
      </AuthProvider>
    );
  }
}

export default withData(MyApp);