import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import CheckoutUserDetails from './CheckoutUserDetails';
import StoreName from './StoreName';
import Link from 'next/link';
import { ifProp } from 'styled-tools';
import Checkout from './Checkout';
import { useRouter } from 'next/router';
import { FormContainer } from '../src/form-context';
import { authContext, useAuth } from '../src/auth-context';

const MultiStepFormStyles = styled.div`
  nav {
    position: relative;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 16px;
      width: 100%;
      background: ${(props) => props.theme.colors.lightGrey};
      height: 1px;
      z-index: 1;
    }
    ul {
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        margin-bottom: 0.5rem;
        margin-right: 1rem;
        z-index: 2;
        background: ${(props) => props.theme.colors.white};
        /* display: flex;
          align-items: center; */
      }
    }
  }
`;

const NavigationItemLink = styled.a`
  /* padding: 1rem; */
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &::disabled {
    pointer-events: none;
  }

  .nav_badge {
    /* padding: 0.7rem; */
    padding: 0.5rem;
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    text-align: center;
    display: inline-block;
    border-radius: 50%;
    margin: 0;
    height: 32px;
    width: 32px;

    display: flex;
    justify-content: center;
    align-items: center;
    ${ifProp(
      'currentStep',
      css`
        background: ${(props) => props.theme.colors.secondaryBlue};
        color: ${(props) => props.theme.colors.white};
      `,
      css`
        background: ${(props) => props.theme.colors.white};
        color: ${(props) => props.theme.colors.black};
      `
    )}
  }

  .nav_link_text {
    padding-left: 1rem;
    padding-right: 1rem;
    /* padding: 1rem; */
    /* display: flex;
              align-items: center; */
  }
`;
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
      disabled: false,
    },
    {
      label: 'Payment',
      value: 2,
      disabled: false,
    },
  ];

  const [step, setStep] = useState(multiSteps[initialStep || 0]);
  const router = useRouter();

  const handleNextStep = () => {
    const nextIndex = multiSteps.findIndex((item) => item.value === step.value);
    setStep(multiSteps[nextIndex + 1]);
    router.push('/checkout/payment');
  };

  const handleDisabled = () => {
    const index = multiSteps.findIndex((item) => item.value === step.value);
    if (index + 1 < multiSteps.length) {
      multiSteps.map((item, idx) => {
        idx > index ? (item.disabled = true) : (item.disabled = false);
      });
    }
  };

  console.log('array is multiSteps: ', multiSteps);

  const { user } = useAuth();

  console.log('SDFSDFSD user: ', user);
  const renderComponent = () => {
    {
      switch (step.value) {
        case 1:
          return (
            <FormContainer>
              <MultiStepFormStyles>
                <header>
                  <StoreName />
                </header>
                <nav>
                  <ul>
                    {multiSteps.map((stepItem) => {
                      return (
                        <li key={stepItem.value}>
                          <Link href="/checkout/delivery">
                            <NavigationItemLink
                              currentStep={stepItem.value === step.value}
                            >
                              <span className="nav_badge">
                                {stepItem.value}
                              </span>
                              <span className="nav_link_text">
                                {stepItem.label}
                              </span>
                            </NavigationItemLink>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <CheckoutUserDetails
                  deliveryOption={deliveryOption}
                  deliveryOptions={deliveryOptions}
                  setDeliveryOption={setDeliveryOption}
                  handleNextStep={handleNextStep}
                />
                {/* </FormContainer> */}
              </MultiStepFormStyles>
            </FormContainer>
          );
        case 2:
          return (
            <MultiStepFormStyles>
              <header>
                <StoreName />
              </header>
              <nav>
                <ul>
                  {multiSteps.map((stepItem) => {
                    return (
                      <li>
                        <Link href="/checkout/payment">
                          <NavigationItemLink
                            currentStep={stepItem.value === step.value}
                          >
                            <span className="nav_badge">{stepItem.value}</span>
                            <span className="nav_link_text">
                              {stepItem.label}
                            </span>
                          </NavigationItemLink>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </nav>
              <Checkout />
              {/* <CheckoutUserDetails
                deliveryOption={deliveryOption}
                deliveryOptions={deliveryOptions}
                setDeliveryOption={setDeliveryOption}
                handleNextStep={handleNextStep}
              /> */}
            </MultiStepFormStyles>
          );
      }
    }
  };

  return renderComponent();
};

export default CheckoutMultiForm;
