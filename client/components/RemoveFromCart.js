import React from "react";
import styled, {css} from "styled-components";
import {useMutation} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from './Loading';
import {useCartDispatch} from '../src/cart-context';
import {ifProp} from 'styled-tools';

const REMOVE_FROM_CART = gql`
  mutation REMOVE_FROM_CART($cartId: String!, $cartItemId: String!) {
    removeFromCart(cartId: $cartId, cartItemId: $cartItemId){
      message
    }
  }
`

const Button = styled.button`
  display: flex;
  margin-left: auto;
  ${ifProp('small', css`
  font-size: 0.8rem;
  `,
  css`
    font-size: 2rem;
  `)};
  border:none;
  background: none;
  cursor: pointer;
`;

const RemoveFromCart = ({cartItemId, cartId, small, children}) => {

  const { fetchCart } = useCartDispatch();
  const [removeFromCart, {loading}] = useMutation(REMOVE_FROM_CART, {
    onCompleted: () => {
      fetchCart();
    }
  });

  if(loading) return <Loading />

    return <Button small={small} onClick={() => {
      removeFromCart({
        variables: {
          cartId,
          cartItemId
        }
      })
    }}>
      {children}
    </Button>
};

export default RemoveFromCart;
