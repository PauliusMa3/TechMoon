import React from "react";
import SignupForm from "../components/SignupForm";
import styled from "styled-components";

const SingUpPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignUpPage = () => {
  return (
    <SingUpPageStyles>
      <SignupForm />
    </SingUpPageStyles>
  );
};

export default SignUpPage;
