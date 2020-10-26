import React from 'react';
import Router from 'next/router';
import styled from 'styled-components';
import {Button} from '../../components/styles/CartStyles';

const Page = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h3 {
        font-size: 3rem;
        color: ${(props) => props.theme.colors.successGreen};
        margin-bottom: 2rem;
    }

    span {
        padding: 3rem;
        background: ${(props) => props.theme.colors.successGreen};
        /* clip-path: circle(50%); */
        border-radius: 50%;
        height: 4rem;
        width: 4rem;
        font-size: 3rem;
        color: ${(props) => props.theme.colors.white};
        display: flex;
        justify-content: center;
        align-items: center;
    }
    p {
        font-size: 1.2rem;
    }
    `;

const SuccessPage = () => {
    return (
        <Page>
            <span> &#x2714;</span>
            <h3>Payment Successful</h3>
            <p>
               Thank you for your purchase. We are processing your order and you will receive information with the order updates soon.
            </p>
            <Button primary width={'150px'} onClick={() => {
                Router.push('/');
            }}>
                Ok
            </Button>
        </Page>
    );
};

export default SuccessPage;
