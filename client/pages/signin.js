import React from "react"; 
import SignInForm from '../components/SigninForm';
import styled from 'styled-components';

const SingInPageStyles = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SignInPage = () => {

   return (
     <SingInPageStyles>
       <SignInForm />
     </SingInPageStyles>
   );
};

export default SignInPage;
