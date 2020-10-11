import React from 'react';
import styled, {css} from 'styled-components';
import {ifProp} from 'styled-tools';
import {useStepper} from './Stepper';
const ProgressStyles = styled.div`
    nav {
    position: relative;
    font-size: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;

    &:before {
        content: '';
        display: inline-block;
        position: absolute;
        top: 16px;
        width: 100%;
        background: ${(props) => props.theme.colors.lightGrey};
        height: 1px;
        z-index: 1;
    }
    ul {
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;

        li {
            margin-bottom: 0.5rem;
            margin-right: 1rem;
            z-index: 2;
            background: ${(props) => props.theme.colors.white};
        }
    }
    }
`;

const NavigationItemLink = styled.div`
    /* padding: 1rem; */
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    border-radius: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &::disabled {
        pointer-events: none;
    }

    .nav_link_text {
        padding-left: 1rem;
        padding-right: 1rem;
    } 
    
    .nav_badge {
        /* padding: 0.7rem; */
        padding: 0.5rem;
        border: 1px solid ${(props) => props.theme.colors.lightGrey};
        text-align: center;
        display: inline-block;
        border-radius: 50%;
        margin: 0;
        height: 32px;
        width: 32px;

        display: flex;
        justify-content: center;
        align-items: center;
        ${ifProp(
            'currentStep',
            css`
                background: ${(props) => props.theme.colors.secondaryBlue};
                color: ${(props) => props.theme.colors.white};
            `,
            css`
                background: ${(props) => props.theme.colors.white};
                color: ${(props) => props.theme.colors.black};
            `
        )}
    }
`;


export const Progress = ({children}) => {

    return (
        <ProgressStyles>
            <nav>
                <ul>{children}</ul>
            </nav>
        </ProgressStyles>
    );
}

export const Stage = ({children, num, label}) => {

    const {currentStep} = useStepper();
    return (
        <li>
            <NavigationItemLink currentStep={num === currentStep}>
                <span className="nav_badge">{num}</span>
                <span className="nav_link_text">{label}</span>
            </NavigationItemLink>
            {children}
        </li>
    );
}