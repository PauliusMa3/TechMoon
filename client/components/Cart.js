import React from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import Router from 'next/router';
import { TOGGLE_CART_MUTATION } from './Nav';
import Loading from './Loading';
import CartItem from './CartItem';
import { Button, TotalPrice, CartContainer } from './styles/CartStyles';
import { useCartState, useCartDispatch } from '../src/cart-context';
import formatMoney from '../utils/formatMoney';

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
  const { cart, isLoading, error } = useCartState();
  const { fetchCart } = useCartDispatch();
  const [closeCart] = useMutation(TOGGLE_CART_MUTATION);
  if (isLoading) return <Loading />;

  const totalCost = cart
    ? cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  return (
    <CartContainer isOpen={data.cartOpen}>
      <header>
        <h3>Your Shopping Cart</h3>
        <strong onClick={closeCart}> &#10540;</strong>
      </header>
      <ul>
        {cart
          && cart.cartItems.map((cartItem) => (
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
            closeCart();
            Router.push({
              pathname: '/cart',
            });
          }}
        >
          {`View Your Bag (${cart ? cart.cartItems.length : ''})`}

        </Button>
        <Button
          primary
          checkout
          onClick={() => {
            Router.push('/checkout/delivery');
          }}
        >
          <span>Checkout</span>
          <TotalPrice>{totalCost > 0 && formatMoney(totalCost)}</TotalPrice>
        </Button>
      </footer>
    </CartContainer>
  );
};

export default Cart;
