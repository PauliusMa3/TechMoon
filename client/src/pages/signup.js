import React from 'react';
import styled from 'styled-components';
import SignupForm from '../components/Forms/SignupForm';

const SingUpPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const SignUpPage = () => (
  <SingUpPageStyles>
    <SignupForm />
  </SingUpPageStyles>
);

export default SignUpPage;
