import React, { useEffect } from 'react';
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { TOGGLE_CART_MUTATION } from './Nav';
import Loading from './Loading';
import CartItem from './CartItem';
import { Button, TotalPrice } from './styles/CartStyles';
import ErrorCatcher from './ErrorCatcher';
import Router from 'next/router';
import { useCartState, useCartDispatch } from '../src/cart-context';
import formatMoney from '../utils/formatMoney';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

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

const CartContainer = styled.div`
  position: relative;
  border-left: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
  display: grid;
  grid-template-rows: auto 1fr auto;
  width: 40%;
  position: fixed;
  max-width: 500px;
  max-height: calc(100vh - 110px);
  right: 0;
  top: 110px;
  bottom: 0;
  background: white;
  /* transform: ${({ isOpen }) => {
    isOpen ? `translateX(0%)` : `translateX(100%)`;
  }}; */

  ${ifProp(
    'isOpen',
    css`
      transform: translate(0%);
    `,
    css`
      transform: translateX(100%);
    `
  )}
  transition: all 0.3s;
  z-index: 2;
  line-height: 17px;

  header {
    font-size: 1.3rem;
    border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
    padding: 1.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;

    strong {
      font-weight: 800;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  ul {
    z-index: 5000;
    margin: 0;
    padding: 0;
    list-style: none;
    overflow-y: auto;
  }

  footer {
    border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
    padding: 1.5rem;

    ${Button}:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

const Cart = () => {
  const { data } = useQuery(LOCAL_CART_QUERY);
  const { cart, isLoading, error } = useCartState();
  const { fetchCart } = useCartDispatch();
  const [closeCart] = useMutation(TOGGLE_CART_MUTATION);
  if (isLoading) return <Loading />;

  if (error) return <ErrorCatcher error={error} shouldLogin={true} />;

  console.log('Cart component: ', cart);

  const totalCost = cart
    ? cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  console.log('data.cartOpen: ', data.cartOpen);
  return (
    <CartContainer isOpen={data.cartOpen}>
      <header>
        <h3>Your Shopping Cart</h3>
        <strong onClick={closeCart}> &#10540;</strong>
      </header>
      <ul>
        {cart &&
          cart.cartItems.map((cartItem) => {
            return (
              <CartItem
                key={cartItem.id}
                cartItem={cartItem}
                cartId={cart.id}
              />
            );
          })}
      </ul>
      <footer>
        <Button
          onClick={() => {
            closeCart();
            Router.push({
              pathname: '/cart',
            });
          }}
        >{`View Your Bag (${cart ? cart.cartItems.length : ''})`}</Button>
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
