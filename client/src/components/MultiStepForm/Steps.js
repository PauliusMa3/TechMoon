import React from 'react';
import {useStepper} from './Stepper';
import styled from 'styled-components';

export const Step = ({children, num}) => {
    const {currentStep} = useStepper();
    return (
        num === currentStep ? <div>{children}</div> : null
    )
}

export const Steps = ({renderItems}) => {
    const {currentStep, handleNextStep, handlePreviousStep} = useStepper();

    return renderItems(currentStep, handleNextStep, handlePreviousStep);

}