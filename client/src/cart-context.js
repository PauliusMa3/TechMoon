import React, {
  createContext,
  useContext,
  useState,
  useReducer,
  useEffect,
} from 'react';
import Cookies from 'js-cookie';
import gql from 'graphql-tag';
import { useQuery, useLazyQuery } from '@apollo/react-hooks';
import { v4 as uuidv4 } from 'uuid';
import AddToCartButton from '../components/AddToCartButton';
import { number } from 'yup';

const CartStateContext = React.createContext();
const CartDispatchContext = React.createContext();
// const initialState = {
//   cartItems: [],
// };

// const getInitialState = () => {
//   try {
//     return JSON.parse(Cookies.get('cart'));
//   } catch (e) {
//     console.log('Failed to Parse JSON', e);
//   }
// };

const CART_QUERY = gql`
  query CART_QUERY {
    cart {
      id
      sessionId
      status
      cartItems {
        id
        productId
        cartId
        quantity
        name
        sku
        price
        image
      }
    }
  }
`;

// const addToCart = (state, cartItem) => {
//   console.log('addToCart state; ', state);
//   const result = Cookies.get('cart');
//   console.log('result: ', result);
//   console.log('state.cartItems; ', state.cartItems);
//   const alreadyInCart = state.cartItems.find((item) => {
//     console.log('item in find: ', item.id, cartItem.id);
//     return item.productId === cartItem.productId;
//   });

//   console.log('alreadyIncart', alreadyInCart);

//   if (alreadyInCart) {
//     const updatedCartItems = state.cartItems.map((item) => {
//       if (item.id === alreadyInCart.id) {
//         return { ...alreadyInCart, quantity: alreadyInCart.quantity + 1 };
//       }
//       return item;
//     });

//     const updatedState = { ...state, cartItems: updatedCartItems };
//     Cookies.set('cart', updatedState);
//     return updatedState;
//   }
//   cartItem.quantity = 1;
//   cartItem.id = uuidv4();

//   const updatedState = {
//     ...state,
//     cartItems: [...state.cartItems, cartItem],
//   };
//   Cookies.set('cart', updatedState);
//   return updatedState;
// };

// const removeFromCart = (state, cartItem) => {
//   const updatedCartItems = state.cartItems.filter(
//     (item) => item.id !== cartItem.id,
//   );

//   const updatedState = {
//     cartItems: updatedState,
//   };
//   Cookies.set('cart', updatedState);

//   return updatedState;
// };

// function cartReducer(state, action) {
//   switch (action.type) {
//     case 'addToCart': {
//       return addToCart(state, action.cartItem);
//     }
//     case 'removeFromCart': {
//       return removeFromCart(state, action.cartItem);
//     }
//     default: {
//       throw new Error(`Unhandled action type: ${action.type}`);
//     }
//   }
// }

function CartProvider({ children }) {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const [numberOfCartItems, setNumberOfCartItems] = useState(0);

  const [getCart] = useLazyQuery(CART_QUERY, {
      fetchPolicy: 'no-cache',
      onError: (error) => {
          setStatus('error');
          setError(error.message);
          setCartItems([]);
          setCartId(null);
          setNumberOfCartItems(0);
      },
      onCompleted: (data) => {
        setStatus('success');
        setError(null);
        setCartItems(data?.cart?.cartItems ?? []);
        setCartId(data?.cart?.id);
        setNumberOfCartItems(data?.cart?.cartItems.length)
      }
  });


  const fetchCartFunc = ( ) => {
    console.log('fetch Shopping cart is called!');
    setStatus('pending');
    getCart();
  };

    const dispatchValue = React.useMemo(() => {
        return {
            fetchCartFunc
        };
    }, []);

    const value = React.useMemo(() => {
      console.log('useMemo on value change')
;      return {
        cart: { 
          cartItems,
          id: cartId,
        },
        error,
        status,
        numberOfCartItems
      }
    },[status, cartItems, cartId, numberOfCartItems])

  return (
      <CartStateContext.Provider
          value={value}
      >
          <CartDispatchContext.Provider value={dispatchValue}>
              {children}
          </CartDispatchContext.Provider>
      </CartStateContext.Provider>
  );
}

function useCartState() {
  const context = useContext(CartStateContext);

  if (context === undefined) {
    throw new Error('useCartState must be within CartProvider');
  }

  const isLoading = context.status === 'pending' || context.loading;
  const totalCost = context.cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity,0);

  return {
    ...context,
    isLoading, totalCost
  };
}

function useCartDispatch() {
  const context = useContext(CartDispatchContext);

  if (context === undefined) {
    throw new Error('useCartDispatch must be within CartProvider');
  }

  const { fetchCartFunc: fetchCartFunction } = context;

  const fetchCart = React.useCallback(() => fetchCartFunction(), []);
  return {
    fetchCart
  };
}

export { CartProvider, useCartState, useCartDispatch };
