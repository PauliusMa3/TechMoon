import React from 'react';
import styled from 'styled-components';
import ForgotPasswordLink from '../components/Forms/ForgotPasswordForm';


const ForgotPasswordPageStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, ${props => props.theme.colors.trustyBlue} 45%, ${props => props.theme.colors.white} 0%);
`


const ForgotPassword = () => {
    return (
        <ForgotPasswordPageStyles>
            <ForgotPasswordLink />
        </ForgotPasswordPageStyles>
    )
}

export default ForgotPassword;