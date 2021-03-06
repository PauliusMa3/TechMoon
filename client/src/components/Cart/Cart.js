import React, {useCallback} from 'react';
import {gql} from '@apollo/client';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { TOGGLE_CART_MUTATION } from '../Nav';
import Loading from '../Loading/Loading';
import CartItem from './CartItem';
import { Button, TotalPrice, CartContainer } from './CartStyles';
import { useCartState } from '../../context/cart-context';
import formatMoney from '../../utils/formatMoney';
import useClickOutside from '../../hooks/useClickOutside';

export const LOCAL_CART_QUERY = gql`
    query {
        cartOpen @client
    }
`;
export const CART_QUERY = gql`
  query CART_QUERY {
    cart {
      id
      cartItems {
        id
        productId
        cartId
        quantity
        name
        sku
        image
        price
      }
    }
  }
`;

const Cart = () => {
  const { data } = useQuery(LOCAL_CART_QUERY);
  const { cart, isLoading, numberOfCartItems, totalCost } = useCartState();
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);

  const closeShoppingCart = useCallback(
    () => {
      if(data.cartOpen) {
        toggleCart({
            variables: {
                cartEnabled: false
            }
        });
      }
    },
    [],
  )
  const cartRef = useClickOutside(closeShoppingCart);

  if (isLoading) return <Loading />;

  return (
      <CartContainer isOpen={data.cartOpen} ref={cartRef}>
          <header>
              <h3>Your Shopping Cart</h3>
              <strong onClick={() => {
                toggleCart({
                variables: {
                    cartEnabled: false
                }
                    });
              }}> &#10540;</strong>
          </header>
          <ul>
              {cart &&
                  cart.cartItems.map((cartItem) => (
                      <CartItem
                          key={cartItem.id}
                          cartItem={cartItem}
                          cartId={cart.id}
                      />
                  ))}
          </ul>
          <footer>
              <Button
                  onClick={() => {
                      toggleCart();
                      Router.push({
                          pathname: '/cart'
                      });
                  }}
              >
                  {`View Your Bag ${numberOfCartItems > 0 ? `(${numberOfCartItems})` : ''}`}
              </Button>
              <Button
                  primary
                  checkout
                  onClick={() => {
                      Router.push('/checkout');
                  }}
              >
                  <span>Checkout</span>
                  <TotalPrice>
                      {formatMoney(totalCost)}
                  </TotalPrice>
              </Button>
          </footer>
      </CartContainer>
  );
};

export default Cart;
