import React from 'react';
import styled from 'styled-components';
import {FaSearch} from 'react-icons/fa';

const StyledIcon = styled(FaSearch)`
  color: ${(props) => props.theme.colors.primaryBlue};
  /* cursor: pointer; */
  &:hover {
    cursor: pointer;
  }
`;


const Form = styled.form`
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 5%;
  display: flex;
  align-items: center;
  overflow: hidden;

  position: relative;
  input {
    padding: 0.7rem 0.9rem;
    border: none;
    transition: width 0.2s ease-in-out;
    width: 300px;

    &:focus {
      outline: none;
      width: 400px;
    }
  }

  ${StyledIcon} {
    position: absolute;
    justify-content: flex-end;
    height: 15px;
    width: auto;
    right: 0.5rem;
  }
`;

const Search = () => {

   return ( 
  //  <Form>
      <>
        <input 
        type="text"
        placeholder= "Search ..."
        />
        <StyledIcon />
        </>)
{/* 
    </Form>) */}
}

export default Search;