
import React, {useState} from 'react';
import {useAuth} from '../../context/auth-context';
import {ErrorBannerStyles} from './styles';

const ErrorBanner = ({...props}) => {
    const {cleanAuthError} = useAuth();
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