import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import {gql} from '@apollo/client';
import Loading from '../../Loading';
import { useCartDispatch } from '../../../context/cart-context';
import {Button} from './RemoveFromCart.styles';

const REMOVE_FROM_CART = gql`
  mutation REMOVE_FROM_CART($cartId: String!, $cartItemId: String!) {
    removeFromCart(cartId: $cartId, cartItemId: $cartItemId){
      message
    }
  }
`;


const RemoveFromCart = ({
  cartItemId, cartId, small, children,
}) => {
  const { fetchCart } = useCartDispatch();
  const [removeFromCart, { loading }] = useMutation(REMOVE_FROM_CART, {
    onCompleted: () => {
      fetchCart();
    },
  });

  if (loading) return <Loading />;

  return (
    <Button
      small={small}
      onClick={() => {
        removeFromCart({
          variables: {
            cartId,
            cartItemId,
          },
        });
      }}
    >
      {children}
    </Button>
  );
};

export default RemoveFromCart;
