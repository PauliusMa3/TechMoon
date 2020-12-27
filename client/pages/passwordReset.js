import React from 'react';
import styled from 'styled-components';
import PasswordResetForm from '../components/Forms/PasswordResetForm';


const ResetPasswordStyles = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background: linear-gradient(180deg, ${props => props.theme.colors.trustyBlue} 45%, ${props => props.theme.colors.white} 0%);
`

const PasswordResetPage = ({router}) => {
 return (
    <ResetPasswordStyles>
        <PasswordResetForm resetToken={router.query.resetToken || ''}/>
    </ResetPasswordStyles>
 )
}

export default PasswordResetPage;