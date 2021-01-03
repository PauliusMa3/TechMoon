import styled from 'styled-components';
import { ifProp } from 'styled-tools';

const QuantitySelectorStyles = styled.div`
  span {
    margin: 0rem 0.6rem;
  }
  display: flex;
  align-items: center;
`;
const QuantityButton = styled.button`
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
  border-radius: 50%;
  background: none;
  text-align: center;
  cursor: pointer;
  color: ${ifProp(
    'minus',
    'red',
    `${(props) => props.theme.colors.secondaryBlue}`,
  )};
  font-size: 1.3rem;

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
  }

  &:focus {
    outline: none;
  }
`;

export {QuantitySelectorStyles, QuantityButton}