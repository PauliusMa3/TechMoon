import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import slug from 'slug';
import RemoveFromCart from '../Buttons/RemoveFromCart/RemoveFromCart';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import formatMoney from '../../utils/formatMoney';

const CartItemStyles = styled.li`
  padding: 1rem;
  display: flex;
  flex: 1 0 60px;
  align-items: center;
  margin-bottom: 0.5rem;

  img {
    height: 39px;
    flex-basis: 39px;
    margin-right: 1rem;
  }

  a {
    font-size: 1rem;
    cursor: pointer;
    color: ${(props) => props.theme.colors.black};

    &:hover {
      color: ${(props) => props.theme.colors.secondaryBlue};
    }
  }

  .item-details {
    flex: 1;
    display: grid;
    grid-template-columns: 1fr auto auto;
    align-items: center;
    grid-gap: 10px;
  }

  span {
    font-size: 1rem;
  }
`;

const CartItem = ({ cartItem, cartId }) => (
  <CartItemStyles>
    <img src={cartItem.image} />
    <div className="item-details">
      <Link href={`/product/${slug(cartItem.name)}?id=${cartItem.productId}`}>
        <a>{cartItem.name}</a>
      </Link>
      <QuantitySelector
        quantity={cartItem.quantity}
        productId={cartItem.productId}
      />
      <span>{formatMoney(cartItem.price)}</span>
    </div>
    <RemoveFromCart cartItemId={cartItem.id} cartId={cartId}>
      &times;
    </RemoveFromCart>
  </CartItemStyles>
);

export default CartItem;
