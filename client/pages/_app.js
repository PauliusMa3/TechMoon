import App from 'next/app';
import { ApolloProvider } from '@apollo/react-hooks';
// import { ApolloProvider } from '@apollo/client';
import Page from '../components/Page';
import withData from '../lib/ApolloClient';
import { AuthProvider } from '../src/auth-context';
import { CartProvider } from '../src/cart-context';

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
