import styled from 'styled-components';

export const TabManagerStyles = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 2rem;
  padding: 0 2rem;

  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};

  *:not(:last-child) {
    margin-right: 4rem;
  }
  .tab {
    cursor: pointer;
    font-size: 1rem;
    position: relative;
    min-height: 30px;
    text-transform: capitalize;

    &:hover {
      color: ${(props) => props.theme.colors.secondaryBlue};
    }
  }

  .selected-tab {
    color: ${(props) => props.theme.colors.secondaryBlue};

    :after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      height: 3px;
      background: ${(props) => props.theme.colors.secondaryBlue};
      bottom: -1px;
    }
  }
`;
