import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';
import { CheckoutStyles } from './CheckoutStyles';

const stripePromise = loadStripe('pk_test_eo45Dl7sHgPRye2xbCv4WNT000EDLWD3wO');

const Checkout = ({values}) =>
  (
    <CheckoutStyles>
      <Elements stripe={stripePromise}>
        <CheckoutForm values={values} />
      </Elements>
    </CheckoutStyles>
  );
export default Checkout;
