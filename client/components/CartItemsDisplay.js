import React, { useEffect } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import slug from 'slug';
import { useCartState, useCartDispatch } from '../src/cart-context';
import Loading from './Loading';
import Error from './ErrorCatcher';
import QuantitySelector from './QuantitySelector';
import formatMoney from '../utils/formatMoney';
import RemoveFromCart from './RemoveFromCart';

const ProductsInCart = styled.div`
  margin-top: 2rem;
  padding: 0 0.7rem;
  background: ${(props) => props.theme.colors.white};

  div:not(:first-child) {
    margin-top: 2rem;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-auto-rows: min-content;
  grid-gap: 2rem;
  grid-gap: 10px;

  img {
    height: 150px;
    width: 150px;
    object-fit: cover;
    margin-right: 1rem;
  }
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
`;

const ProductDetails = styled.div`
  font-size: 1rem;
  display: flex;
  flex-direction: column;

  a {
    margin-bottom: 1rem;
    color: ${(props) => props.theme.colors.black};
  }
  small {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.secondaryGrey};
    margin-bottom: 1.2rem
  }
/* 
  ${QuantitySelector} {
    color: ${(props) => props.theme.colors.black};
    font-size: 1rem;
  } */
`;

const ProductPrice = styled.div`
  font-size: 1.5rem;
  font-family: "Mont-bold";
`;

const ProductActions = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-right: auto;
  align-items: center;

  &:first-child {
    margin-right: 1rem;
  }
  .product_actions_remove {
    color: ${(props) => props.theme.colors.secondaryBlue};
  }
`;

const CartItemsDisplay = () => {
  const {
    cart, numberOfCartItems, isLoading, error,
  } = useCartState();

  if (isLoading) return (<Loading />);

  return (
    <ProductsInCart>
      {cart
          && cart.cartItems.map((cartItem) => (
            <Row key={cartItem.id}>
              <img src={cartItem.image} />
              <ProductDetails>
                <Link
                  href={`/product/${slug(cartItem.name)}?id=${
                    cartItem.productId
                  }`}
                >
                  <a>{cartItem.name}</a>
                </Link>
                <small>hidden</small>
                {/* <ProductActions>
                    <QuantitySelector
                      quantity={cartItem.quantity}
                      productId={cartItem.productId}
                    />
                    <RemoveFromCart
                      small={true}
                      cartItemId={cartItem.id}
                      cartId={cart.id}
                    >
                      <span className="product_actions_remove">Remove</span>
                    </RemoveFromCart>
                  </ProductActions> */}
              </ProductDetails>
              <ProductPrice>{formatMoney(cartItem.price)}</ProductPrice>
            </Row>
          ))}
    </ProductsInCart>
  );
};

export default CartItemsDisplay;