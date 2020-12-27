import React from 'react';
import CheckoutUserDetails from './CheckoutUserDetails';
import StoreName from './StoreName';
import Checkout from './Checkout';
import Stepper from './MultiStepForm/Stepper';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import styled, {css} from 'styled-components';
import {ifProp} from 'styled-tools';

const Button = styled.button`
    padding: 1rem 2rem;

    ${ifProp(
        'primary',
        css`
            background: linear-gradient(to right, #00b4db, #0083b0);
            color: ${(props) => props.theme.colors.white};
            border: none;
        `,
        css`
            color: #00b4db;
            background: ${(props) => props.theme.colors.white};

            border: 1px solid ${(props) => props.theme.colors.specialBlue};
        `
    )};
    margin-right: 1rem;

    font-size: 1.1rem;
    border-radius: 10px;
    margin-top: 1rem;
    cursor: pointer;
    transition: opacity 0.2s ease-in-out;
    letter-spacing: 1.7px;

    &::focus {
        outline: none;
    }

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.6;
    }
`;


const CheckoutMultiForm = () =>  {
    const numberOfCheckoutSteps = 2;

    const handleSubmit = (values, actions, currentStep, handleNextStep) => {
        if (currentStep < numberOfCheckoutSteps) {
            handleNextStep(currentStep + 1);
        }

        actions.setSubmitting(false);
    }

    return (
        <Stepper step={1}>
            <header>
                <StoreName />
            </header>
            <Stepper.Progress>
                <Stepper.Stage num={1} label="Shipping" />
                <Stepper.Stage num={2} label="Payment" />
            </Stepper.Progress>
            <Stepper.Steps
                numberOfSteps={numberOfCheckoutSteps}
                renderItems={(
                    currentStep,
                    handleNextStep,
                    handlePreviousStep
                ) => {
                    return (
                        <Formik
                            initialValues={{
                                name: '',
                                lastName: '',
                                email: '',
                                phone: '',
                                address: '',
                                zip: '',
                                radioOption: 'store-pickup',
                                nameOnCard: ''
                            }}
                            // validationSchema={Yup.object({
                                // name: Yup.string().required(
                                //     'Name field is required'
                                // ),
                                // lastName: Yup.string().required(
                                //     'Last Name field is required'
                                // ),
                                // email: Yup.string()
                                //     .email('Email is invalid')
                                //     .required('Email field is required'),
                            //     // zip: Yup.string()
                            //         // .required('Zip code field is required')
                            //         // .matches(/^[0-9]+$/, 'Must be only digits'),
                            //     phone: Yup.string().required(
                            //         'Phone field is required'
                            //     ),
                            //     nameOnCard: Yup.string().required('Name on the Card Required')
                            // })}
                            onSubmit={(values, actions) => {
                                console.log('onSubmit handler call');
                                handleSubmit(
                                    values,
                                    actions,
                                    currentStep,
                                    handleNextStep
                                );
                            }}
                        >
                            {({ values }) => {
                                return (
                                    <Form>
                                        <Stepper.Step num={1}>
                                            <CheckoutUserDetails
                                                currentOption={
                                                    values.radioOption
                                                }
                                            />
                                        </Stepper.Step>
                                        <Stepper.Step num={2}>
                                            <Checkout values={values} />
                                        </Stepper.Step>

                                        {currentStep !== 1 && (
                                            <>
                                                <Button
                                                    onClick={handlePreviousStep}
                                                >
                                                    Back
                                                </Button>
                                            </>
                                        )}
                                        {currentStep <
                                            numberOfCheckoutSteps && (
                                            <Button primary type="submit">
                                                Next
                                            </Button>
                                        )}
                                    </Form>
                                );
                            }}
                        </Formik>
                    );
                }}
            ></Stepper.Steps>
        </Stepper>
    );
}

export default CheckoutMultiForm;
