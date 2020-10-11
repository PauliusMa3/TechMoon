import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {Steps, Step} from './Steps';
import {Progress, Stage} from './Progress';

const StepperContext = React.createContext();

const Stepper = ({step, children}) => {
    const [currentStep, setCurrentStep ] = useState(step);  

    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };   

    return (
        <StepperContext.Provider value={{currentStep, handleNextStep}}>
            <>
                {children}
            </>
        </StepperContext.Provider>
    )

}

Stepper.Steps = Steps;
Stepper.Step = Step;
Stepper.Progress = Progress;
Stepper.Stage  = Stage;

export const useStepper = () => {
    const context = useContext(StepperContext);

    if(!context) {
        throw new Error("context must be within Stepper Provider");
    }

    return context
}

export default Stepper;