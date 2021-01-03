import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { ADD_TO_CART } from '../Buttons/AddToCart/AddToCart';
import { useCartDispatch } from '../../context/cart-context';
import {QuantitySelectorStyles, QuantityButton} from './styles';


const QuantitySelector = ({ quantity, productId }) => {
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
