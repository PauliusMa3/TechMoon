import styled from "styled-components";

export const DropdownStyles = styled.div`
  position: relative;
  ul {
    list-style: none;
    padding: 0;

    li {
      font-size: 1rem;
      padding: 1rem 1.5rem;
      letter-spacing: 1.7px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      border-left: 3px solid ${(props) => props.theme.colors.lightGrey};

      &:hover {
        color: ${(props) => props.theme.colors.tertiaryBlue};
        border-left: 3px solid ${(props) => props.theme.colors.tertiaryBlue};
        transition: border 0.1s ease-out;
      }
    }
  }
`;

export const DropdownListWrapper = styled.div`
  box-shadow: ${(props) => props.theme.boxShadow};
  position: absolute;
  top: 5rem;
  min-width: 300px;
  z-index: 500;
  background: ${(props) => props.theme.colors.white};
`;
