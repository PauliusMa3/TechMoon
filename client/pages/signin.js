import React from 'react';
import styled from 'styled-components';
import SignInForm from '../components/SigninForm';

const SingInPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInPage = () => (
  <SingInPageStyles>
    <SignInForm />
  </SingInPageStyles>
);

export default SignInPage;
