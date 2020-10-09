import React, {useState} from "react";
import styled from "styled-components";
import gql from 'graphql-tag';
import {useMutation} from '@apollo/react-hooks';
import {FormStyles, UserIcon, LockIcon, InputField} from './styles/FormStyles';


const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        signup(email: $email, name:$name password: $password ){
          email
        }
    }
`;

const ErrorMessage = styled.span`
  color: red;
  display: block;
  margin-top: 0.3rem;
  font-size: 0.8rem;
`

const Form = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] =useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({})



    const [signup, {loading, data}] = useMutation(SIGNUP_MUTATION);

    const submitForm = async(e) => {
        e.preventDefault();

        if(errors.confirmPassword) {
          setErrors({confirmPassword: false});
        }

       await signup({variables: {
            email: email,
            name: name,
            password: password
        }});


        setEmail('');
        setPassword('');
        setName('');
        setConfirmPassword('');
      }

   return (
     <FormStyles
       onSubmit={(e) => {
         e.preventDefault();
         if (confirmPassword === password) {
           setErrors({ confirmPassword: false });
           submitForm(e);
           return;
         }

         setErrors({ confirmPassword: true });

       }}
       method="post"
     >
       <h2>Create an Account</h2>
       <fieldset disabled={loading}>
         <label htmlFor="email">
           Email:
           <InputField>
             <UserIcon />
             <input
               type="email"
               name="email"
               onChange={(e) => setEmail(e.target.value)}
               value={email}
               placeholder="Type Your Email"
             />
           </InputField>
         </label>
         <label htmlFor="name">
           Name:
           <InputField>
             <UserIcon />
             <input
               type="text"
               name="name"
               onChange={(e) => setName(e.target.value)}
               value={name}
               placeholder="Type Your Name"
             />
           </InputField>
         </label>
         <label htmlFor="password">
           Password:
           <InputField>
             <LockIcon />
             <input
               type="password"
               name="password"
               onChange={(e) => setPassword(e.target.value)}
               value={password}
               placeholder="Type your Password"
             />
           </InputField>
         </label>

         <label htmlFor="confirmPassword">
           Password:
           <InputField error={errors.confirmPassword}>
             <LockIcon />
             <input
               type="password"
               name="confirmPassword"
               onChange={(e) => setConfirmPassword(e.target.value)}
               value={confirmPassword}
               placeholder="Confirm your Password"
             />
           </InputField>
           {errors.confirmPassword && (
             <ErrorMessage>{"Passwords should match"}</ErrorMessage>
           )}
         </label>
         <button type="submit">Create Account</button>
       </fieldset>
     </FormStyles>
   );
};

export default Form;
