import React from 'react';
import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';
import gql from 'graphql-tag';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { CART_QUERY } from './Cart';
import { useCartDispatch } from '../src/cart-context';

const TOGGLE_CART_MUTATION = gql`
  mutation TOGGLE_CART_MUTATION($cartEnabled: Boolean) {
    toggleCartOpen(cartEnabled: $cartEnabled) @client
  }
`;

export const ADD_TO_CART = gql`
  mutation ADD_TO_CART($productId: Int!, $decreaseQuantity: Boolean) {
    addToCart(productId: $productId, decreaseQuantity: $decreaseQuantity) {
      message
    }
  }
`;

const AddToCartButtonStyles = styled.button`
  background: ${(props) => props.theme.colors.secondaryBlue};
  border: 0;
  margin: 0;
  border-radius: 20px;
  padding: 0.4rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  max-height: 3rem;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

const Title = styled.span`
  font-family: 'Mont-bold';
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
`;

const StyledCartIcon = styled(FaShoppingCart)`
  color: ${(props) => props.theme.colors.secondaryBlue};
  width: 18px;
  height: auto;
  margin-right: 0.5rem;
  font-weight: 100;
  margin: 0;
`;

const CartIconWrapper = styled.div`
  background: white;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;

const AddToCartButton = ({ productId, product }) => {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const { fetchCart } = useCartDispatch();

  const [addToCart] = useMutation(ADD_TO_CART, {
    onCompleted: () => {
      toggleCart({
        variables: {
          cartEnabled: true,
        },
      });
      fetchCart();
    },
  });

  return (
    <AddToCartButtonStyles
      onClick={async (e) => {
        e.preventDefault();
        e.stopPropagation();

        await addToCart({
          variables: {
            productId: parseInt(productId),
          },
        });
      }}
    >
      <CartIconWrapper>
        <StyledCartIcon />
      </CartIconWrapper>

      <Title>Add To Cart</Title>
    </AddToCartButtonStyles>
  );
};

export default AddToCartButton;
