import styled from 'styled-components';
import {FaEnvelope} from 'react-icons/fa'

export const ForgotPasswordForm = styled.form`
    padding: 2rem;
    box-shadow: ${props => props.theme.boxShadow};
    max-width: 700px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Robo-regular';
    background: ${props => props.theme.colors.white};

    .forgot-password-image {
        align-self: center;
    }

    h2 {
        font-size: 2rem;
    }

    label {
        font-size: 0.8rem;
        color: ${props => props.theme.colors.labelGrey};
    }

    p {
        font-size: 1rem;
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
export const EnvelopeIcon = styled(FaEnvelope)`
    fill: ${(props) => props.theme.colors.secondaryGrey};
    margin: 0.5rem;
`;