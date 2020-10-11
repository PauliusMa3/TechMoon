import React, { useState } from 'react';
import { useRouter } from 'next/router';
import CheckoutUserDetails from './CheckoutUserDetails';
import StoreName from './StoreName';
import Checkout from './Checkout';
import Stepper from './MultiStepForm/Stepper';

const CheckoutMultiForm = ({
  deliveryOptions,
  deliveryOption,
  setDeliveryOption,
  initialStep = 0,
}) => {
    const multiSteps = [
        {
            label: 'Delivery',
            value: 1,
            disabled: false
        },
        {
            label: 'Payment',
            value: 2,
            disabled: false
        }
    ];

    const [step, setStep] = useState(multiSteps[initialStep || 0]);
    const router = useRouter();

    const handleNextStep = () => {
        const nextIndex = multiSteps.findIndex(
            (item) => item.value === step.value
        );
        setStep(multiSteps[nextIndex + 1]);
        router.push('/checkout/payment');
    };

    return (
        <>
            <Stepper step={1}>
                <header>
                    <StoreName />
                </header>
                <Stepper.Progress>
                    <Stepper.Stage num={1} label="Shipping" />
                    <Stepper.Stage num={2} label="Payment" />
                </Stepper.Progress>
                <Stepper.Steps>
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
                </Stepper.Steps>
            </Stepper>
        </>
    );
};

export default CheckoutMultiForm;
