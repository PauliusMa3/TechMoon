import React from 'react';
import styled from 'styled-components';
import SignInForm from '../components/Forms/SignInForm';

const SingInPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SignInPage = () => (
  <SingInPageStyles>
    <SignInForm />
  </SingInPageStyles>
);

export default SignInPage;
