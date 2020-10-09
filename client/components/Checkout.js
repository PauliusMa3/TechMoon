import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { CheckoutStyles } from './CheckoutStyles';
import { useCartState } from '../src/cart-context';
import CartItemsDisplay from './CartItemsDisplay';
import ProtectedRoute from './ProtectedRoute';
import { useAuth } from '../src/auth-context';
import Router from 'next/router';

const stripePromise = loadStripe('pk_test_eo45Dl7sHgPRye2xbCv4WNT000EDLWD3wO');

const Checkout = () => {
  // const { cart, isLoading, error } = useCartState();
  return (
    <CheckoutStyles>
      {/* <CartItemsDisplay /> */}
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
    </CheckoutStyles>
  );
};

export default Checkout;
