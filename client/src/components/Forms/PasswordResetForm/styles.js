import styled from 'styled-components';
import InputField from '../FormElements/InputField';


export const StyledInputField = styled(InputField)`
    margin-top: 0.5rem;
`


export const PasswordResetFormStyles = styled.div`
    padding: 2rem;
    box-shadow: ${props => props.theme.boxShadow};
    max-width: 700px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Robo-regular';
    background: ${props => props.theme.colors.white};

    .base_form {
        width: 100%;
    }

    h2 {
        font-size: 2rem;
    }

    label {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.labelGrey};
    }

    fieldset {
        width: 100%;
        border: none;

        &:disabled {
            opacity: 0.7;
        }
    }


    button {
        width: 100%;
        padding: 1rem;
        color: ${props => props.theme.colors.white};
        border: none;
        border-radius: 10px;
        background: ${props => props.theme.colors.successGreen};
        margin-top: 2rem;
        cursor: pointer;
        font-size: 1.2rem;

        &:hover {
            opacity: 0.7;
            transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
    }


    a {
        margin-top: 1rem;
        font-size: 1rem;
        color: ${props => props.theme.colors.labelGrey};

        &:hover {
            text-decoration: underline;
        }
    }
`