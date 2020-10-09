import React from 'react';
import styled from 'styled-components';
import { useCartState } from '../src/cart-context';
import formatMoney from '../utils/formatMoney';
import Loading from './Loading';

const CartItemsListStyles = styled.div`
  position: relative;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  font-family: 'Robo-regular';

  ul {
    padding: 0;
    list-style: none;
  }

  h4 {
    align-items: center;
  }
`;

const CartListItem = styled.div`
  display: grid;
  grid-template-columns: auto auto auto 1fr;
  grid-gap: 10px;
  align-items: center;
  padding: 5px;

  span {
    display: inline-block;
  }
  .price {
    justify-self: end;
  }
`;

const CartItemsList = () => {
  const { cart, isLoading } = useCartState();

  if (isLoading) return <Loading />;

  return (
    <CartItemsListStyles>
      <h4>Shopping Cart</h4>
      <ul>
        {cart
          && cart.cartItems.map((cartItem) => (
            <CartListItem key={cartItem.id}>
              <span>
                {cartItem.quantity}
                {' '}
                &times;
              </span>
              <img src={cartItem.image} height={40} width={40} />
              <p>{cartItem.name}</p>
              <p className="price">
                {formatMoney(cartItem.price * cartItem.quantity)}
              </p>
            </CartListItem>
          ))}
      </ul>
    </CartItemsListStyles>
  );
};

export default CartItemsList;
