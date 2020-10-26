import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Router from 'next/router';
import { useCartState } from '../src/cart-context';
import InputField from './Form/InputField';

const CREATE_ORDER_MUTATION = gql`
  mutation CREATE_ORDER {
    createOrder {
      clientSecret
    }
  }
`;

const DELETE_CART_MUTATION = gql`
  mutation DELETE_CART_MUTATION($cartId: String!) {
    deleteCart(cartId: $cartId) {
      message
    }
  }
`;

const PaymentFormWrapper = styled.div`
  width: 100%;
`


export default function CheckoutForm({values}) {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const stripe = useStripe();
  const elements = useElements();

  const { cart } = useCartState();

  const [deleteCart] = useMutation(DELETE_CART_MUTATION);
  const client = useApolloClient();

  const fetchClientToken = async () => {
    try {
      const res = await client.mutate({
          mutation: CREATE_ORDER_MUTATION
      });

      return res;
    } catch(e) {
      console.error(e.message);
      return {
        failed: true
      }
    }
  };

  const cardStyle = {
    style: {
      base: {
        color: '#32325d',
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {},
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a',
      },
    },
  };
  const handleChange = async (event) => {
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setProcessing(true);
    const {address, city, country, zip,email, name, phone} = values;
    const orderResult =  await fetchClientToken();

    if(orderResult.failed) {
      setError('Failed to fulfil your order. Please try again');
      return;
    }

    const {data: {createOrder: clientSecret}} = orderResult;

    const payload = await stripe.confirmCardPayment(clientSecret.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          address: {
            city: city ? city : null,
            country: country ? country : null,
            line1: address ? address : null,
            postal_code: zip ? zip : null,
          },
          email,
          name,
          phone
        },
      },
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      deleteCart({
        variables: {
          cartId: cart.id,
        },
      });
      setSucceeded(true);
      Router.push('/orders/thankyou');
    }
  };

  return (
      <PaymentFormWrapper onSubmit={handleSubmit}>
          <h3>Card Details</h3>
          <InputField
              type="name"
              name="nameOnCard"
              placeholder="Name on Card"
              label="Name on Card"
          />
          <label>Card Details</label>
          <CardElement
              id="card-element"
              options={cardStyle}
              onChange={handleChange}
          />
          <button disabled={processing || disabled || succeeded} id="submit" onClick={(e) => {
            handleSubmit(e);
          }}>
              <span id="button-text">
                  {processing ? (
                      <div className="spinner" id="spinner" />
                  ) : (
                      'Pay'
                  )}
              </span>
          </button>
          {/* Show any error that happens when processing the payment */}
          {error && (
              <div className="card-error" role="alert">
                  {error}
              </div>
          )}
          {/* Show a success message upon completion */}
          {/* <p className={succeeded ? "result-message" : "result-message hidden"}>
        Payment succeeded
      </p> */}
      </PaymentFormWrapper>
  );
}
