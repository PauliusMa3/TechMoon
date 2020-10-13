import React, { useState } from 'react';
import styled from 'styled-components';
import { FaStore, FaTruck } from 'react-icons/fa';
import { useAuth } from '../src/auth-context';
import formatMoney from '../utils/formatMoney';
// import { useForm, FormContainer } from '../src/form-context';
import InputField from './Form/InputField';

const Container = styled.div`
  box-sizing: border-box;
  width: 700px;
`;

const Form = styled.div`
  height: 100%;
  font-family: 'Robo-regular';
  h3 {
    font-size: 1rem;
    font-family: 'Mont-bold';
  }
  hr {
    margin-top: 2rem;
    margin-bottom: 2rem;
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    border-width: 1px;
  }

  hr:before {
    position: absolute;
    width: 100%;
    width: 2px;
  }

  fieldset {
    margin: 0;
    padding: 0;
    display: flex;
  }

  label {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.secondaryGrey};
    margin-bottom: 0.5rem;
  }

  button[type='submit'] {
    padding: 1rem 2rem;
    background: ${(props) => props.theme.colors.secondaryBlue};
    color: ${(props) => props.theme.colors.white};
    font-size: 1.1rem;
    border-radius: 30px;
    border: none;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }

    &:disabled {
      pointer-events: none;
      opacity: 0.6;
    }
  }
`;

const AddressArea = styled.div`
  margin-top: 2rem;
`

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  /* padding: 1rem 1rem; */

  label {
    padding: 18px 24px 18px 58px;
    display: flex;
    align-items: center;
    /* justify-content: space-between; */
    margin: 0;
    position: relative;
    cursor: pointer;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.colors.black};
  }

  input[type='radio'] {
    opacity: 0;
    position: absolute;
    width: 0;
    height: 0;
  }

  label::before {
    content: '';
    display: flex;
    position: absolute;

    height: 24px;
    width: 24px;
    left: 16px;
    border-radius: 50%;
    margin-right: 2rem;

    border: 1px solid;
  }

  label::after {
    content: '';
    display: flex;
    left: 19px;
    height: 18px;
    width: 18px;
    position: absolute;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.green};
  }

  input[type='radio'] + label::after {
    content: none;
  }

  input[type='radio']:checked + label::before {
    content: '';
    border-color: ${(props) => props.theme.colors.green};
  }

  input[type='radio']:checked + label::after {
    content: '';
  }
`;

const StyledIcon = styled(({ component, ...props }) => React.cloneElement(component, props))`
  height: 44px;
  width: 44px;
  margin-right: 1rem;
  color: ${(props) => props.theme.colors.black};
`;

const FieldSet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const CheckoutUserDetails = ({
  deliveryOptions,
  deliveryOption,
  setDeliveryOption,
  handleNextStep,
}) => {
  const { isAuthenticated, user } = useAuth();
//   const { setFields } = useForm();

  return (
      <Container>
          <Form>
              <FieldSet>
                  <InputField
                      type="name"
                      label="Name"
                      name="name"
                      placeholder="Enter your Name"
                      required
                  />
                  <InputField
                      type="text"
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter your Last Name"
                  />
                  <InputField
                      type="email"
                      label="Email"
                      name="email"
                      placeholder="Enter your Email"
                  />
                  <InputField
                      type="tel"
                      label="Phone Number"
                      name="phone"
                      placeholder="Enter your Phone"
                  />
              </FieldSet>
              <AddressArea>
                  <FieldSet>
                      <InputField
                          type="text"
                          label="Address"
                          name="address"
                          placeholder="Enter your Address"
                      />
                      <InputField
                          type="text"
                          label="Zip Code"
                          name="zip"
                          placeholder="Enter your Zip Code"
                      />
                  </FieldSet>
              </AddressArea>
          </Form>

          {/* <FieldSet>
                          <label htmlFor="address">
                              Address:
                              <input
                                  type="address"
                                  id="address"
                                  required
                                  name="address"
                                  placeholder="Enter delivery address"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                          <label htmlFor="zip">
                              Zip Code:
                              <input
                                  id="zip"
                                  name="zip"
                                  type="text"
                                  placeholder="Enter your zip codes"
                                  pattern="[0-9]*"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                          <label htmlFor="city">
                              City:
                              <input
                                  id="city"
                                  name="city"
                                  type="text"
                                  placeholder="Enter city"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                          <label htmlFor="country">
                              City:
                              <input
                                  id="country"
                                  name="country"
                                  type="country"
                                  placeholder="Enter Country"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                      </FieldSet>

              <hr />
              <FieldSet>
                  <Checkbox>
                      <input
                          type="radio"
                          name="delivery-1"
                          id="delivery-1"
                          value={formatMoney(deliveryOptions[0].value)}
                          checked={
                              deliveryOption.label === 'Collect at the Store'
                          }
                          onChange={() => setDeliveryOption(deliveryOptions[0])}
                      />
                      <label htmlFor="delivery-1">
                          <StyledIcon component={deliveryOptions[0].icon} />
                          Collect at the store
                      </label>
                  </Checkbox>
                  <Checkbox>
                      <input
                          type="radio"
                          name="delivery-2"
                          id="delivery-2"
                          value={formatMoney(deliveryOptions[1].value)}
                          checked={deliveryOption.label === 'Home Delivery'}
                          onChange={() => setDeliveryOption(deliveryOptions[1])}
                      />
                      <label htmlFor="delivery-2">
                          <StyledIcon component={deliveryOptions[1].icon} />
                          Home Delivery
                      </label>
                  </Checkbox>
              </FieldSet>
              {deliveryOption.label === 'Home Delivery' && (
                  <AddressArea>
                      <FieldSet>
                          <label htmlFor="address">
                              Address:
                              <input
                                  type="address"
                                  id="address"
                                  required
                                  name="address"
                                  placeholder="Enter delivery address"
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                          <label htmlFor="zip">
                              Zip Code:
                              <input
                                  id="zip"
                                  name="zip"
                                  type="text"
                                  placeholder="Enter your zip codes"
                                  pattern="[0-9]*"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                          <label htmlFor="city">
                              City:
                              <input
                                  id="city"
                                  name="city"
                                  type="text"
                                  placeholder="Enter city"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                          <label htmlFor="country">
                              City:
                              <input
                                  id="country"
                                  name="country"
                                  type="country"
                                  placeholder="Enter Country"
                                  required
                                  value={name}
                                  onChange={(e) => setName(e.target.value)}
                              />
                          </label>
                      </FieldSet>
                  </AddressArea>
              )}
              <hr />
          </Form> */}
      </Container>
  );
};

export default CheckoutUserDetails;
