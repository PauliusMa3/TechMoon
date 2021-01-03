import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';

export const InputFieldStyles = styled.div`
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
`;

export const Label = styled.label`
    width: 100%;
    font-size: 0.8rem;
    color: ${(props) => props.theme.colors.black};

    &:focus {   
        border-color: ${(props) => props.theme.colors.secondaryBlue};
    }

    .error {
        color: ${(props) => props.theme.colors.errorRed2};
    }

    .error {
        margin-top: 0.25rem;
    }
`;
export const CustomInputFieldStyles = styled.div`
    display: flex;
    align-items: center;
`;

export  const InputWithIcon = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};

    ${ifProp(
        'error',
        css`
            border-bottom: 1px solid
                ${(props) => props.theme.colors.errorRed2};
        `,
        css`
            border-bottom: 1px solid
                ${(props) => props.theme.colors.lightGrey};
        `
    )}

    input {
        width: 100%;
        border: none;

        padding: 0.8rem 0.8rem 0.8rem 0;
        font-size: 1rem;

        &:focus {
            outline: none;
        }

        ::placeholder {
            font-size: 1rem;
            color: ${(props) => props.theme.colors.secondaryGrey};
        }
    }
`;