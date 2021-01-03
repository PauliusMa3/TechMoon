import React from 'react';
import Link from 'next/link';
import {
  FaCreditCard, FaSignOutAlt, FaUser,
} from 'react-icons/fa';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import { useAuth } from '../../context/auth-context';
import { useCartState, useCartDispatch } from '../../context/cart-context';
import Dropdown from '../Dropdown';
import {
  NavLink,
  NavStyles,
  StyledCartIcon,
  LinkTitle,
  StyledUserIcon,
  NumberOfItemsInCart,
} from './NavStyles';

export const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCartOpen @client
  }
`;

const Nav = () => {
    const { isAuthenticated, logout, user } = useAuth();
    const { numberOfCartItems } = useCartState();
    const { fetchCart } = useCartDispatch();

    const [toggleCartOpen] = useMutation(TOGGLE_CART_MUTATION);

    const handleLogout = async () => {
        await logout();
        fetchCart();
    };

    const loggedInUserOptions = [
        {
            id: 1,
            title: 'Orders',
            pathname: '/orders',
            icon: FaCreditCard
        },
        {
            id: 1,
            title: 'Profile',
            pathname: '/profile',
            icon: FaUser
        },
        {
            id: 2,
            title: 'Logout',
            action: () => handleLogout(),
            icon: FaSignOutAlt
        }
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
                <Dropdown
                    title={`Hi ${user.name}`}
                    items={loggedInUserOptions}
                />
            )}
            <NavLink
                onClick={() => {
                    toggleCartOpen();
                }}
            >
                <StyledCartIcon />
                <LinkTitle>Cart</LinkTitle>
                {numberOfCartItems > 0 && (
                    <NumberOfItemsInCart>
                        {numberOfCartItems}
                    </NumberOfItemsInCart>
                )}
            </NavLink>
        </NavStyles>
    );
};

export default Nav;
