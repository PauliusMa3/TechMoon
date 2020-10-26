import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTruck, FaStore } from 'react-icons/fa';
import MultiStepCheckout from '../components/CheckoutMultiForm';
import CartItemsList from '../components/CartItemsList';
import formatMoney from '../utils/formatMoney';
import { useCartState } from '../src/cart-context';
import totalPrice from '../utils/totalPrice';

const CheckoutPageStyles = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    min-height: 100vh;
    font-family: 'Robo-regular';
    overflow-y: auto;
`;

const LeftSide = styled.div`
    padding-top: 3rem;
    padding-left: 3.5rem;
    padding-right: 2.5rem;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    overflow: auto;
`;

const RightSide = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding-left: 3rem;
    padding-right: 3rem;
    padding-top: 3rem;
    overflow: auto;
    border-left: 1px solid ${(props) => props.theme.colors.lightGrey};
`;

const OrderDetails = styled.div`
    border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
    font-size: 1rem;
    display: flex;
    flex-direction: column;
    width: 500px;
    padding: 0.5rem;
    position: relative;

    h4 {
        margin: 0.7rem 0 0.7rem 0;
    }
`;
const DeliveryItem = styled.div`
    display: grid;
    grid-template-columns: auto auto 1fr;
    grid-gap: 15px;
    align-items: center;
    padding: 0.5rem;
    max-width: 600px;

    span {
        justify-self: end;
    }
`;

const SubTotal = styled.div`
    border-top: 1px solid ${(props) => props.theme.colors.lightGrey};
    margin-top: 0.7rem;
    display: flex;
    padding-top: 1rem;
    justify-content: space-between;
`;

const CheckoutPage = () => {
    const deliveryOptions = [
        {
            label: 'Collect at the Store',
            price: 0,
            icon: <FaStore size={40} />
        },

        {
            label: 'Home Delivery',
            price: 599,
            icon: <FaTruck size={40} />
        }
    ];

    const [deliveryOption, setDeliveryOption] = useState(deliveryOptions[0]);

    const { cart, isLoading } = useCartState();

    const deliveryPrice = formatMoney(deliveryOption.price);

    return (
        <CheckoutPageStyles>
            <LeftSide>
                <MultiStepCheckout
                    deliveryOptions={deliveryOptions}
                    deliveryOption={deliveryOption}
                    setDeliveryOption={setDeliveryOption}
                    initialStep={0}
                />
            </LeftSide>
            <RightSide>
                <CartItemsList />
                <OrderDetails>
                    <h4>Delivery</h4>
                    <DeliveryItem>
                        {deliveryOption.icon}
                        <p>{deliveryOption.label}</p>
                        <span>{deliveryPrice}</span>
                    </DeliveryItem>
                    <SubTotal>
                        <strong>SubTotal</strong>
                        {cart && (
                            <strong>
                                {formatMoney(
                                    totalPrice(cart.cartItems) +
                                        deliveryOption.price
                                )}
                            </strong>
                        )}
                    </SubTotal>
                </OrderDetails>
            </RightSide>
        </CheckoutPageStyles>
    );
};

export default CheckoutPage;
