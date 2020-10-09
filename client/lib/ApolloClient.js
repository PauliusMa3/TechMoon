import { InMemoryCache } from "apollo-cache-inmemory";
import { createHttpLink } from "apollo-link-http";
import { ApolloClient } from "apollo-client";
import fetch from "isomorphic-fetch";
import withApollo from "next-with-apollo";
import { ApolloLink } from "apollo-link";
import { setContext } from "apollo-link-context";
import gql from "graphql-tag";
import { SERVER } from "../config";
import { LOCAL_CART_QUERY } from "../components/Cart";

const httpLink = createHttpLink({
  uri: SERVER,
  credentials: "include",
  // fetchOptions: {
  //   credentials: "include",
  // },
});

// const authMiddleware = (authToken) =>
//   new ApolloLink((operation, forward) => {
//     if (authToken) {
//       operation.setContext({
//         fetchOptions: {
//           credentials: "include",
//         },
//       });
//     }
//     return forward(operation);
//   });

// const authLink = setContext((_, { headers }) => {
//   // // get the authentication token from local storage if it exists
//   // const token = localStorage.getItem("token");
//   // // return the headers to the context so httpLink can read them
//   return {
//     headers: {
//       ...headers,
//       "Access-Control-Allow-Origin": "*",
//     },
//     fetchOptions: { credentials: "include", mode: "no-cors" },
//   };
// });

// cache.write();

const initialState = {
  cartOpen: false,
};

const mutations = {
  toggleCartOpen: (_, args, { cache }) => {
    const { cartOpen } = cache.readQuery({
      query: LOCAL_CART_QUERY,
    });
    const hasArgProvided = args && typeof args.cartEnabled === "boolean";

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
  () =>
    new ApolloClient({
      link: httpLink,
      cache,
      resolvers: {
        Mutation: mutations,
      },
      // defaultOptions: {
      //   cartOpen: false,
      // },
      // credentials: "include",
    })
);
