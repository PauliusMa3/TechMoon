import React from 'react';
import styled, {css} from 'styled-components';
import { FaStore, FaTruck } from 'react-icons/fa';
import InputField from '../../Forms/FormElements/InputField';
import RadioButtons from '../../Forms/FormElements/RadioGroup';
import {ifProp} from 'styled-tools';

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
    transition: all 200ms linear;

    ${ifProp(
        'isOpen',
        css`
            transform: translateY(0%);
            opacity: 1;
        `,
        css`
            transform: translateY(-50%);
            opacity: 0;
        `
    )}
`;

const FieldSet = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const CheckoutUserDetails = ({currentOption}) => {

const deliveryOptions = [
    {
        label: 'Collect at the Store',
        optionName: 'store-pickup',
        value: 0,
        icon: <FaStore size={40} />
    },

    {
        label: 'Home Delivery',
        optionName: 'home-delivery',
        value: 599,
        icon: <FaTruck size={40} />
    }
];

  return (
      <Container>
          <Form>
              <>
                  <h3>Contact Information</h3>
                  <FieldSet>
                      <InputField
                          type="name"
                          label="Name"
                          name="name"
                          placeholder="Enter your Name"
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
              </>
              <hr />
              <RadioButtons
                  name="radioOption"
                  options={deliveryOptions}
                  title={'Delivery Method'}
              />
              <hr />
              <AddressArea isOpen={currentOption !== 'store-pickup'}>
                  <h3>Delivery Address</h3>
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
                      <InputField
                          type="text"
                          label="City"
                          name="city"
                          placeholder="Enter City"
                      />{' '}
                      <InputField
                          type="text"
                          label="Country"
                          name="country"
                          placeholder="Enter your Country"
                      />
                  </FieldSet>
              </AddressArea>
          </Form>
      </Container>
  );
};

export default CheckoutUserDetails;
