import React from 'react';
import {useField} from 'formik';
import {
    InputFieldStyles,
    Label,
    CustomInputFieldStyles,
    InputWithIcon
} from './InputField.styles';



const InputField = ({label, iconInputField, icon, ...props}) => {
  const [field, meta] = useField(props);

    return iconInputField ? (
        <CustomInputFieldStyles>
            <Label htmlFor={props.id || props.name}>
                {label}
                <InputWithIcon error={meta.touched && meta.error}>
                    {icon()}
                    <input {...field} {...props} />
                </InputWithIcon>

                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </Label>
        </CustomInputFieldStyles>
    ) : (
        <InputFieldStyles error={meta.error && meta.touched}>
            <Label htmlFor={props.id || props.name}>
                {label}
                <input className="text-input" {...field} {...props} />
                {meta.touched && meta.error ? (
                    <div className="error">{meta.error}</div>
                ) : null}
            </Label>
        </InputFieldStyles>
    );

}   

export default InputField;