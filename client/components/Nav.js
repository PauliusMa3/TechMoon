import React, { useEffect } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import {
  FaShoppingCart, FaUser, FaCreditCard, FaSignOutAlt,
} from 'react-icons/fa';
import axios from 'axios';
import Router from 'next/router';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useAuth } from '../src/auth-context';
import Cart from './Cart';
import { useCartState, useCartDispatch } from '../src/cart-context';
import Dropdown from './Dropdown';
import {
  NavLink,
  NavStyles,
  StyledCartIcon,
  LinkTitle,
  StyledUserIcon,
  NumberOfItemsInCart,
} from './styles/NavStyles';

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCartOpen @client
  }
`;

const Nav = () => {
  const { isAuthenticated, logout, user } = useAuth();
  const { numberOfCartItems } = useCartState();
  const { fetchCart } = useCartDispatch();

  console.log('numberOfCartItems: ', numberOfCartItems);

  const [toggleCartOpen] = useMutation(TOGGLE_CART_MUTATION);

  const handleLogout = async () => {
    await logout();
    fetchCart();
  };

  const loggedInUserOptions = [
    {
      title: 'Orders',
      pathname: '/profile/orders',
      icon: FaCreditCard,
    },
    {
      title: 'Logout',
      action: () => handleLogout(),
      icon: FaSignOutAlt,
    },
  ];

  return (
    <NavStyles>
      {!isAuthenticated && (
        <Link href="/signin">
          <NavLink>
            <StyledUserIcon />
            <LinkTitle>Sign In</LinkTitle>
          </NavLink>
        </Link>
      )}
      {isAuthenticated && (
        <Dropdown title={`Hi ${user.name}`} items={loggedInUserOptions} />
      )}
      <NavLink
        onClick={() => {
          toggleCartOpen();
        }}
      >
        <StyledCartIcon />
        <LinkTitle>Cart</LinkTitle>
        {numberOfCartItems > 0 && (
          <NumberOfItemsInCart>{numberOfCartItems}</NumberOfItemsInCart>
        )}
      </NavLink>
      {/* {isAuthenticated && (
          <NavLink onClick={() => handleLogout()}>
            <StyledUserIcon />
            <LinkTitle>Log Out</LinkTitle>
          </NavLink>
        )} */}
    </NavStyles>
  );
};

export default Nav;
