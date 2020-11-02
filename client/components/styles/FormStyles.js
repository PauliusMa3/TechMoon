import styled from 'styled-components';
import { FaUser, FaLock } from 'react-icons/fa';
import { ifProp, prop } from 'styled-tools';

export const FormStyles = styled.form`
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 10px;
  max-width: 700px;
  min-width: 500px;
  margin: 0;

  overflow: hidden;

  h2 {
    font-family: 'Mont-bold';
    font-size: 1.5rem;
    text-align: center;
    text-transform: uppercase;
  }

  padding: 2rem;

  fieldset {
    border: none;
    display: flex;
    flex-direction: column;
  }

  label {
    font-size: 0.85rem;
    display: flex;
    flex-direction: column;
    margin-bottom: 1.3rem;
  }

  button {
    display: flex;
    width: 100%;
    color: ${(props) => props.theme.colors.white};
    margin-top: 3rem;

    cursor: pointer;
    justify-content: center;
    padding: 0.75rem 0;
    border-radius: 20px;
    border: none;
    text-transform: uppercase;
    font-size: 0.9rem;

    background: #00b4db;
    background: linear-gradient(to right, #00b4db, #0083b0);
    transition: all 0.2s;

    &:hover {
      opacity: 0.8;
    }

    &:focus {
      outline: none;
    }
  }
`;

export const LinkToSignup = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  span {
    color: ${(props) => props.theme.colors.black};
  }

  a {
    color: ${(props) => props.theme.colors.secondaryBlue};

    &:hover {
      /* color: #004661; */
      color: black;
    }
  }
`;

export const UserIcon = styled(FaUser)`
  fill: ${(props) => props.theme.colors.secondaryGrey};
  margin: 0.5rem;
`;

export const LockIcon = styled(FaLock)`
  fill: ${(props) => props.theme.colors.secondaryGrey};
  margin: 0.5rem;
`;

export const InputField = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};
  margin-top: 0.4rem;
  border-bottom: ${ifProp('error', '1px solid red')};

  &:required {
    border-bottom: 1px solid ${(props) => props.theme.colors.red};
  }

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
