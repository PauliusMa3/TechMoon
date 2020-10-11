import React from 'react';
import {useStepper} from './Stepper';
import styled from 'styled-components';

const Button = styled.button`
    padding: 1rem 2rem;
    background: ${(props) => props.theme.colors.secondaryBlue};
    color: ${(props) => props.theme.colors.white};
    font-size: 1.1rem;
    border-radius: 30px;
    border: none;
    margin-top: 1rem;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }

    &:disabled {
        pointer-events: none;
        opacity: 0.6;
    }
`;

export const Step = ({children, num}) => {
    const {currentStep} = useStepper();
    return (
        num === currentStep ? <div>{children}</div> : null
    )
}

export const Steps = ({children}) => {
    const {currentStep, handleNextStep} = useStepper();

    const numberOfSteps = children.length;
    return (
        <div>
            {children}
            {currentStep < numberOfSteps && (
                <div>
                    <Button onClick={handleNextStep}>Continue</Button>
                </div>
            )}
        </div>
    );

}