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

export const Steps = ({children, numberOfSteps}) => {
    const {currentStep, handleNextStep, handlePreviousStep} = useStepper();

    return (
        <div>
            {children}
            {currentStep < numberOfSteps && (
                <>
                    <Button onClick={handleNextStep}>Continue</Button>
                </>
            )}
            {currentStep !== 1 && (
                <>
                    <Button onClick={handlePreviousStep}>Back</Button>
                </>
            )}
        </div>
    );

}