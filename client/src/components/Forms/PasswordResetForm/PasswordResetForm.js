import React from 'react';
import {Formik, Form} from 'formik';
import {LockIcon} from '../FormElements/FormStyles';
import { PasswordResetFormStyles, StyledInputField} from './styles';
import * as Yup from 'yup';
import {useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client';
import ErrorBanner from '../../ErrorBanner';
import { Router } from 'next/router';

const RESET_PASSWORD = gql`
    mutation RESET_PASSWORD($password: String!, $confirmPassword: String!, $resetToken: String!) {
        resetPassword(password: $password, confirmPassword: $confirmPassword, resetToken: $resetToken) {
            message
        }
    }
`

const PasswordResetForm = ({resetToken}) => {

  const [resetPassword, { loading, error}] = useMutation(RESET_PASSWORD);

   return (

          <Formik
              initialValues={{
                  newPassword: '',
                  confirmNewPassword: '',
              }}
              validationSchema={Yup.object({
                  newPassword: Yup.string()
                      .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
                      )
                      .required('Password is required'),
                  confirmNewPassword: Yup.string().test(
                      'match',
                      'Passwords should match',
                      function (passwordConfirmation) {
                          console.log('passwordConfirmation: ', passwordConfirmation);
                          return passwordConfirmation === this.parent.newPassword;
                      }
                  )
              })}
              onSubmit={(values, actions) => {
                resetPassword({
                    variables: {
                        password: values.newPassword,
                        confirmPassword: values.confirmNewPassword,
                        resetToken
                    }
                })
                actions.resetForm();

                if(!error) {
                    Router.push('/');
                }
              }}
          >

                    <PasswordResetFormStyles>
                
                    <Form className='base_form'>
                      {error && <ErrorBanner error={error.message} />}
                      <h2>Reset Your Password</h2>
                      <fieldset disabled={loading}>
                          <StyledInputField
                              type="password"
                              label="New Password"
                              name="newPassword"
                              placeholder="Enter your new Password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                         <StyledInputField
                              type="password"
                              label="Confirm New Password"
                              name="confirmNewPassword"
                              placeholder="Confirm New Password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                          <button type="submit">
                              {loading ? "Loading..." : "Submit"}
                          </button>
                      </fieldset>
         
              </Form>
                           </PasswordResetFormStyles>
          </Formik>
    )
}

export default PasswordResetForm