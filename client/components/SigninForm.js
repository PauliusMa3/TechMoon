import React, { useState } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import {
  FormStyles,
  UserIcon,
  LockIcon,
  InputField,
  LinkToSignup,
} from './styles/FormStyles';
import { useAuth } from '../src/auth-context';
import { useCartDispatch } from '../src/cart-context';

const Form = () => {
  const [email, setEmail] = useState('paulius@gmail.com');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const {
    login, user, isLoading, error,
  } = useAuth();
  const { fetchCart } = useCartDispatch();

  const submitForm = async (e) => {
    e.preventDefault();

    await login({ email, password });
    fetchCart();
  };

  console.log('error: ', error);

  return (
    <FormStyles
      onSubmit={async (e) => {
        e.preventDefault();
        await submitForm(e);
        console.log('afterSubmit: error', error);
        if (!error) {
          setEmail('');
          setPassword('');
        }
      }}
      method="post"
    >
      <h2>Welcome</h2>
      <fieldset disabled={isLoading}>
        <label htmlFor="email">
          Email:
          <InputField error={error}>
            <UserIcon />
            <input
              required
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder="Type Your Email"
            />
            {error & <p>{error}</p>}
          </InputField>
        </label>
        <label htmlFor="password">
          Password:
          <InputField error={error}>
            <LockIcon />
            <input
              required
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Type your Password"
            />
          </InputField>
        </label>
        <button type="submit">{isLoading ? 'loading...' : 'login'}</button>
      </fieldset>
      <LinkToSignup>
        <span>Don't have an account? </span>
        <Link href="/signup">
          <a>Create an account</a>
        </Link>
      </LinkToSignup>
    </FormStyles>
  );
};

export default Form;
