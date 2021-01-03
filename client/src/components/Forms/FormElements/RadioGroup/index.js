import React from 'react';
import {Field} from 'formik'
import {RadioButton, StyledIcon, FieldSet} from './styles';

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
