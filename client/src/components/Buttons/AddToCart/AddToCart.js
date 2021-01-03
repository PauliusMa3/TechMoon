import React from 'react';
import {gql} from '@apollo/client';
import { useMutation } from '@apollo/react-hooks';
import { useCartDispatch } from '../../../context/cart-context';
import {AddToCartButtonStyles, CartIconWrapper, StyledCartIcon, Title} from './AddToCart.styles';

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


const AddToCartButton = ({ productId }) => {
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
