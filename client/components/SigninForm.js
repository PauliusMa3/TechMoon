import React from 'react';
import Link from 'next/link';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import {
  FormStyles,
  UserIcon,
  LockIcon,
  LinkToSignup,
} from './styles/FormStyles';
import { useAuth } from '../src/auth-context';
import { useCartDispatch } from '../src/cart-context';
import InputField from './Form/InputField';
import ErrorBanner from '../components/ErrorBanner';

const SigninForm = () => {
  const {
    login, isLoading, error: authError,
  } = useAuth();
  const { fetchCart } = useCartDispatch();

  return (
    <Formik
        initialValues={{
            email: '',
            password: ''
        }}
        validationSchema={Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
            password: Yup.string().required('Password is required')
        })}
        onSubmit={(values) => {
            const { email, password } = values;
            login({ email, password });
            fetchCart();
        }}
    >
        <Form>
            <FormStyles>
                {authError && <ErrorBanner authError={authError} />}
                <h2>Welcome</h2>
                <fieldset>
                    <InputField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
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

                    <LinkToSignup>
                        <span>Don't have an account? </span>
                        <Link href="/signup">
                            <a>Create an account</a>
                        </Link>
                    </LinkToSignup>
                    <button type="submit">
                        {isLoading ? 'loading...' : 'login'}
                    </button>
                </fieldset>
            </FormStyles>
        </Form>
    </Formik>
  );
};

export default SigninForm;
