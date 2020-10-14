import React from 'react';
import styled from 'styled-components';
import {Field} from 'formik'
const RadioButton = styled.div`
    display: flex;
    align-items: center;
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    /* padding: 1rem 1rem; */

    span {
        color: ${(props) => props.theme.colors.black};
    }

    label {
        padding: 18px 24px 18px 58px;
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        margin: 0;
        position: relative;
        cursor: pointer;
        height: 100%;
        width: 100%;
        color: ${(props) => props.theme.colors.black};
    }

    input[type='radio'] {
        opacity: 0;
        position: absolute;
        width: 0;
        height: 0;
    }

    label::before {
        content: '';
        display: flex;
        position: absolute;

        height: 24px;
        width: 24px;
        left: 16px;
        border-radius: 50%;
        margin-right: 2rem;

        border: 1px solid;
    }

    label::after {
        content: '';
        display: flex;
        left: 19px;
        height: 18px;
        width: 18px;
        position: absolute;
        border-radius: 50%;
        background-color: ${(props) => props.theme.colors.green};
    }

    input[type='radio'] + label::after {
        content: none;
    }

    input[type='radio']:checked + label::before {
        content: '';
        border-color: ${(props) => props.theme.colors.green};
    }

    input[type='radio']:checked + label::after {
        content: '';
    }
`;

const StyledIcon = styled(({ component, ...props }) =>
    React.cloneElement(component, props)
)`
    height: 44px;
    width: 44px;
    margin-right: 1rem;
    color: ${(props) => props.theme.colors.black};
`;

const FieldSet = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 15px;
`;

const RadioButtons = ({options, name, title, ...rest }) => {

    return (
        <div>
            <h3>{title}</h3>
            <FieldSet>
            </FieldSet>
            <Field name={name} {...rest}>
                {({ field }) => {
                    return (
                    <FieldSet>
                        {options.map((option) => {
                            return (
                                <RadioButton key={option.value}>
                                    <input
                                        type="radio"
                                        {...field}
                                        id={option.value}
                                        value={option.optionName}
                                        checked={
                                            field.value === option.optionName
                                        }
                                    />
                                    <label htmlFor={option.value}>
                                        {option.icon && (
                                            <StyledIcon
                                                component={option.icon}
                                            />
                                        )}
                                        <span>{option.label}</span>
                                    </label>
                                </RadioButton>
                            );
                        })}
                    </FieldSet>
                    )
                }}
            </Field>
        </div>
    );

}

export default RadioButtons
