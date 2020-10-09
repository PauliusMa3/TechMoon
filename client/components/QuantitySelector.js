import React from 'react';
import styled from 'styled-components';
import { ifProp } from 'styled-tools';
import { useMutation, useLazyQuery } from '@apollo/react-hooks';
import { CART_QUERY } from './Cart';
import { ADD_TO_CART } from './AddToCartButton';
import { useCartDispatch, useCartState } from '../src/cart-context';

const QuantitySelectorStyles = styled.div`
  span {
    margin: 0rem 0.6rem;
  }
  display: flex;
  align-items: center;
`;
const QuantityButton = styled.button`
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 50%;
  background: none;
  text-align: center;
  cursor: pointer;
  color: ${ifProp(
    'minus',
    'red',
    `${(props) => props.theme.colors.secondaryBlue}`,
  )};
  font-size: 1.3rem;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

const QuantitySelector = ({ quantity, productId }) => {
  const [refetchCart] = useLazyQuery(CART_QUERY);
  const { fetchCart } = useCartDispatch();
  const [updateQuantity] = useMutation(ADD_TO_CART, {
    onCompleted: () => {
      fetchCart();
    },
  });

  return (
    <QuantitySelectorStyles>
      <QuantityButton
        onClick={async () => {
          await updateQuantity({
            variables: {
              productId: parseInt(productId),
            },
          });
        }}
      >
        &#43;
      </QuantityButton>
      <span>{quantity}</span>
      <QuantityButton
        minus
        disabled={quantity === 1}
        onClick={async () => {
          await updateQuantity({
            variables: {
              productId: parseInt(productId),
              decreaseQuantity: true,
            },
          });
        }}
      >
        &minus;
      </QuantityButton>
    </QuantitySelectorStyles>
  );
};

export default QuantitySelector;
