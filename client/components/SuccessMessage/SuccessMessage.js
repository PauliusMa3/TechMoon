
import React, {useState} from 'react';
import {SuccessMessageStyles} from './styles';

const SuccessMessage = ({message}) => {
    const handleClose = () => {
        setShowMessage(false);
    }

    const [showMessage, setShowMessage] = useState(true);
    return showMessage ? (
        <SuccessMessageStyles>
            <p>
                {message}
            </p>
            <span onClick={handleClose}> &#10005;</span>
        </SuccessMessageStyles>
    ) : null;

}

export default SuccessMessage;