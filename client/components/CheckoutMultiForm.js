import React from 'react';
import CheckoutUserDetails from './CheckoutUserDetails';
import StoreName from './StoreName';
import Checkout from './Checkout';
import Stepper from './MultiStepForm/Stepper';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';

const CheckoutMultiForm = () =>  {


    return (
        <Stepper step={1}>
            <header>
                <StoreName />
            </header>
            <Stepper.Progress>
                <Stepper.Stage num={1} label="Shipping" />
                <Stepper.Stage num={2} label="Payment" />
            </Stepper.Progress>
            <Stepper.Steps numberOfSteps={2}>
                <Formik
                    initialValues={{
                        name:'',
                        lastName: '',
                        email: '',
                        phone: '',
                        address: '',
                        zip: '',
                        radioOption: 'store-pickup'
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('Name field is required'),
                        lastName: Yup.string().required(
                            'Last Name field is required'
                        ),
                        email: Yup.string()
                            .email('Email is invalid')
                            .required('Email field is required'),
                        zip: Yup.string()
                            .required('Zip code field is required')
                            .matches(/^[0-9]+$/, 'Must be only digits'),
                        phone: Yup.string().required('Phone field is required'),
                        address: Yup.string().required('Address field is required')
                    })}
                >
                    {({values}) => {
                        return (
                            <Form>
                                <Stepper.Step num={1}>
                                    <CheckoutUserDetails
                                        currentOption={values.radioOption}
                                    />
                                </Stepper.Step>
                                <Stepper.Step num={2}>
                                    <Checkout />
                                </Stepper.Step>
                            </Form>
                        );
                    }}
                </Formik>
            </Stepper.Steps>
        </Stepper>
    );
}

export default CheckoutMultiForm;
