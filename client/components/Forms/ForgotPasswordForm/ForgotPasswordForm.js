import React from 'react';
import {Form, Formik} from 'formik';
import * as Yup from 'yup';
import { useCartDispatch } from '../../../src/cart-context';
import InputField from '../FormElements/InputField';
import ErrorBanner from '../../ErrorBanner/ErrorBanner';
import { ForgotPasswordForm} from './styles';
import Image from 'next/image';
import {EnvelopeIcon} from './styles';
import Link from 'next/link';
import {useMutation} from '@apollo/react-hooks';
import {gql} from '@apollo/client'
import SuccessMessage from '../../SuccessMessage';


const PASSWORD_RESET_REQUEST = gql`
    mutation PASSWORD_RESET_REQUEST  ($email: String!) {
        passwordResetRequest(email: $email) {
            message
        }
    }
`

const ForogotPasswordForm = () => {

  const [passwordResetRequest, {loading, called, error}] = useMutation(PASSWORD_RESET_REQUEST);

  return (
    <Formik
        initialValues={{
            email: '',
        }}
        validationSchema={Yup.object({
            email: Yup.string()
                .email('Email is invalid')
                .required('Email is required'),
        })}
        onSubmit={({email}) => {

            passwordResetRequest({
                variables: {
                    email
                }
            })
        }}
    >
        <Form>
            <ForgotPasswordForm>
                <ErrorBanner error={error.message} />
                {!error && !loading && called && <SuccessMessage message={data.message} />}
                <h2>Forgot Password</h2>
                <p>Enter your email and we'll send you a link to reset your password</p>
                <Image 
                    style={{alignSelf: 'center'}}
                    className='forgot-password-image'
                    src="/forgot-password.png"
                    alt='Forgot Password picture'
                    width={150}
                    height={100}
                    layout="fixed"
                />
                <fieldset disabled={loading}>
                    <InputField
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        iconInputField
                        icon={() => <EnvelopeIcon />}
                    />
                    <button type="submit">
                        {isLoading ? 'loading...' : 'Submit'}
                    </button>
                </fieldset>
                <Link href='/signin'>
                    <a> &larr; Back to Login</a>
                </Link>
            </ForgotPasswordForm>
        </Form>
    </Formik>
  );
};

export default ForogotPasswordForm;

