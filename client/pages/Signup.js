import React from 'react';
import styled from 'styled-components';
import SignupForm from '../components/SignupForm';

const SingUpPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpPage = () => (
  <SingUpPageStyles>
    <SignupForm />
  </SingUpPageStyles>
);

export default SignUpPage;
