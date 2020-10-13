import React from 'react';
import CheckoutUserDetails from './CheckoutUserDetails';
import StoreName from './StoreName';
import Checkout from './Checkout';
import Stepper from './MultiStepForm/Stepper';
import {Formik, Form} from 'formik';
import {useAuth} from '../src/auth-context';
import * as Yup from 'yup';

const CheckoutMultiForm = ({
    deliveryOptions,
    deliveryOption,
    setDeliveryOption
}) =>  {

    const {isAuthenticated, user} = useAuth();
    console.log('user: ', user);

    const initialName =  isAuthenticated ?  `${user.name}` : '';

    console.log('initialName: ', initialName);
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
                        zip: ''
                    }}
                    validationSchema={Yup.object({
                        name: Yup.string().required('This field is required')
                    })}
                >
                    <Form>
                        <Stepper.Step num={1}>
                            <CheckoutUserDetails
                                deliveryOption={deliveryOption}
                                deliveryOptions={deliveryOptions}
                                setDeliveryOption={setDeliveryOption}
                            />
                        </Stepper.Step>
                        <Stepper.Step num={2}>
                            <Checkout />
                        </Stepper.Step>
                    </Form>
                </Formik>
            </Stepper.Steps>
        </Stepper>
    );
}

export default CheckoutMultiForm;
