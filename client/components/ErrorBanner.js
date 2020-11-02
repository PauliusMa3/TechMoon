
import React, {useState} from 'react';
import styled from 'styled-components';
import {useAuth} from '../src/auth-context';

const ErrorBannerStyles = styled.div`
    width: 100%;
    padding: 1rem 1rem;
    border: 1px solid ${(props) => props.theme.colors.errorRed2};
    display: flex;
    justify-content: center;
    border-radius: 5px;
    align-items: center;
    background: ${(props) => props.theme.colors.lightred};
    font-size: 1.2rem;
    color: ${(props) => props.theme.colors.errorRed2};
    span {
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: auto;
    }

    p {
        margin: 0;
        padding: 0;
    }

    transform: translateY(0%);
    transition: all 0.2 ease-in-out;

`;

const ErrorBanner = ({...props}) => {
    const {cleanAuthError} = useAuth();
    console.log("ERROR BANNER");

    console.log('authError: ', props.authError);
    const handleClose = () => {
        setShowError(false);
        if(props.authError) {
            cleanAuthError();
        }
    }

    const [showError, setShowError] = useState(true);
    return showError ? (
        <ErrorBannerStyles>
            <p>
                {props.authError}
                {props.error}
            </p>
            <span onClick={handleClose}> &#10005;</span>
        </ErrorBannerStyles>
    ) : null;

}

export default ErrorBanner;