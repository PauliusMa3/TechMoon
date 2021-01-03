import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import withApollo from 'next-with-apollo';
import { ApolloLink } from 'apollo-link';
import { SERVER } from '../../config';
import { LOCAL_CART_QUERY } from '../components/Cart';
import { onError } from 'apollo-link-error'

const httpLink = createHttpLink({
  uri: SERVER,
  credentials: 'include',
});


const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(`GraphQL Error: ${message}`),
    );
  }
  if (networkError) {
    console.log(`Network Error: ${networkError.message}`);
  }
});


const initialState = {
  cartOpen: false,
};

const links = ApolloLink.from([
  errorLink,
  httpLink
])

const mutations = {
  toggleCartOpen: (_, args, { cache }) => {
    const { cartOpen } = cache.readQuery({
      query: LOCAL_CART_QUERY,
    });
    const hasArgProvided = args && typeof args.cartEnabled === 'boolean';

    cache.writeData({
      data: {
        cartOpen: hasArgProvided ? args.cartEnabled : !cartOpen,
      },
    });

    return null;
  },
};

const cache = new InMemoryCache().restore(initialState || {});

cache.writeData({
  data: {
    cartOpen: false,
  },
});

export default withApollo(
  () => new ApolloClient({
    link: links,
    cache,
    resolvers: {
      Mutation: mutations,
    },
  }),
);
