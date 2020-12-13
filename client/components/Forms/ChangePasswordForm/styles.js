import styled from 'styled-components';
import InputField from '../FormElements/InputField';


export const StyledInputField = styled(InputField)`
    margin-top: 0.5rem;
`


export const ChangePasswordFormStyles = styled.div`
    padding: 2rem;
    max-width: 700px;
    box-shadow: ${(props) => props.theme.boxShadow};
    height: max-content;
    flex: 1 1;

    h2 {
        font-size: 1.2rem;
    }

    fieldset {
        border: none;

        &:disabled {
            opacity: 0.7;
            pointer-events: none;
        }
    }

    button {
        margin-top: 1rem;
        border: none;
        background: linear-gradient(to right, #11998e, #38ef7d);
        border-radius: 10px;
        color: ${props => props.theme.colors.white};
        padding: 0.7rem 1rem;
        cursor: pointer;

        &:focus {
            outline: none;
        }
    }
`