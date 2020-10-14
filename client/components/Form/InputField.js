import React from 'react';
import {useField} from 'formik';
import styled, {css} from 'styled-components';
import {ifProp} from 'styled-tools';


const InputFieldStyles = styled.div`
    input {
            width: 100%;

        ${ifProp(
            'error',
            css`
                border: 1px solid ${(props) => props.theme.colors.errorRed2};
            `,
            css`
                border: 1px solid ${(props) => props.theme.colors.secondaryGrey};
            `
        )}

        border-radius: 5px;
        padding: 0.8rem 0.5rem;
    }

  label {
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.secondaryGrey};
    margin-bottom: 0.5rem;
  }

    &:focus {
      border-color: ${(props) => props.theme.colors.secondaryBlue};
    }

    .error {
        color: ${(props) => props.theme.colors.errorRed2};
    }
`;

const InputField = ({label, ...props}) => {
  const [field, meta] = useField(props);

  return (
      <InputFieldStyles error={meta.error && meta.touched}>
          <label htmlFor={props.id || props.name}>
              {label}
              <input className="text-input" {...field} {...props} />
              {meta.touched && meta.error ? (
                  <div className="error">{meta.error}</div>
              ) : null}
          </label>
      </InputFieldStyles>
  );

}   

export default InputField;