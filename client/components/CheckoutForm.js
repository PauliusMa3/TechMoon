import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useMutation, useApolloClient } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Loading from './Loading';
import styled from 'styled-components';
import Router from 'next/router';
import { useCartState } from '../src/cart-context';
import { useForm } from '../src/form-context';

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

const FieldStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  label {
    margin-bottom: 0.5rem;
  }
`;

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => {
  return (
    <FieldStyles>
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        autoComplete={autoComplete}
        value={value}
        onChange={onChange}
      />
    </FieldStyles>
  );
};
export default function CheckoutForm() {
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();
  const [billingDetails, setBillingDetails] = useState({
    name: 'Paulius Malke',
    email: 'Paulius.Malinauskas@outlook.com',
  });

  const { values } = useForm();

  console.log('checkoutForm Values: ', values);

  const { cart } = useCartState();

  const [deleteCart] = useMutation(DELETE_CART_MUTATION);
  const client = useApolloClient();

  const fetchClientToken = async () => {
    const res = await client.mutate({
      mutation: CREATE_ORDER_MUTATION,
    });

    if (res) {
      setClientSecret(res.data.createOrder.clientSecret);
    }
  };

  useEffect(() => {
    fetchClientToken();
  }, []);

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

    const payload = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: billingDetails,
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
    <form id="payment-form" onSubmit={handleSubmit}>
      <h3>Card Details</h3>
      <Field
        id="email"
        type="email"
        placeholder="Enter your e-mail"
        required={true}
        value={billingDetails.email}
        label={'Email'}
        onChange={(e) =>
          setBillingDetails({ ...billingDetails, email: e.target.value })
        }
      />
      <Field
        id="name"
        type="name"
        placeholder="Name"
        required={true}
        value={billingDetails.name}
        label={'Name on the Card'}
        onChange={(e) =>
          setBillingDetails({ ...billingDetails, name: e.target.value })
        }
      />
      {/* id, type, placeholder, required, autoComplete, value, onChange, */}
      <label>Card Details</label>
      <CardElement
        id="card-element"
        options={cardStyle}
        onChange={handleChange}
      />
      <button disabled={processing || disabled || succeeded} id="submit">
        <span id="button-text">
          {processing ? <div className="spinner" id="spinner"></div> : 'Pay'}
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
    </form>
  );
}
