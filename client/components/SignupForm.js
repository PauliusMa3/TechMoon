  import React from 'react';
  import Link from 'next/link';
  import { Form, Formik } from 'formik';
  import * as Yup from 'yup';
  import {
      FormStyles,
      UserIcon,
      LockIcon,
      LinkToSignup
  } from './styles/FormStyles';
  import { useAuth } from '../src/auth-context';
  import InputField from './Form/InputField';
  import ErrorBanner from '../components/ErrorBanner';



  const SignUpForm = () => {
      const { register, isLoading, error: authError } = useAuth();

      return (
          <Formik
              initialValues={{
                  email: 'paulius1@gmail.com',
                  name: 'paulius',
                  password: 'Password1',
                  confirmPassword: 'Password1'
              }}
              validationSchema={Yup.object({
                  email: Yup.string()
                      .email('Email is invalid')
                      .required('Email is required'),
                  name: Yup.string().required('Name is required'),
                  password: Yup.string()
                      .matches(
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
                          'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number'
                      )
                      .required('Password is required'),
                  confirmPassword: Yup.string().test(
                      'match',
                      'Passwords should match',
                      function (passwordConfirmation) {
                          console.log(
                              'this.parent.password: ',
                              this.parent.password
                          );
                          return passwordConfirmation === this.parent.password;
                      }
                  )
              })}
              onSubmit={(values) => {
                  const { email, password, name } = values;
                  register({
                      email,
                      password,
                      name
                  });
              }}
          >
              <Form>
                  <FormStyles>
                      {authError && <ErrorBanner authError={authError} />}
                      <h2>Create an Account</h2>
                      <fieldset disabled={isLoading}>
                          <InputField
                              type="email"
                              label="Email"
                              name="email"
                              placeholder="Enter your email"
                              iconInputField
                              icon={() => <UserIcon />}
                          />
                          <InputField
                              type="name"
                              label="Name"
                              name="name"
                              placeholder="Enter your name"
                              iconInputField
                              icon={() => <UserIcon />}
                          />
                          <InputField
                              type="password"
                              label="Password"
                              name="password"
                              placeholder="Enter your password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                          <InputField
                              type="password"
                              label="Confirm Password"
                              name="confirmPassword"
                              placeholder="Confirm your password"
                              iconInputField
                              icon={() => <LockIcon />}
                          />
                          <LinkToSignup>
                              <span>Already have an account? </span>
                              <Link href="/signin">
                                  <a>Log in</a>
                              </Link>
                          </LinkToSignup>
                          <button type="submit">
                              {isLoading ? 'loading...' : 'register'}
                          </button>
                      </fieldset>
                  </FormStyles>
              </Form>
          </Formik>
      );
  };

  export default SignUpForm;


