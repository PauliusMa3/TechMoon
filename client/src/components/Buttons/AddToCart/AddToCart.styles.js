import styled from 'styled-components';
import { FaShoppingCart } from 'react-icons/fa';

export const AddToCartButtonStyles = styled.button`
  background: ${(props) => props.theme.colors.secondaryBlue};
  border: 0;
  margin: 0;
  border-radius: 20px;
  padding: 0.4rem 0.7rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  max-height: 3rem;

  &:hover {
    opacity: 0.8;
  }

  &:focus {
    outline: none;
  }
`;

export const Title = styled.span`
  font-family: 'Mont-bold';
  color: ${(props) => props.theme.colors.white};
  font-size: 1rem;
`;

export const StyledCartIcon = styled(FaShoppingCart)`
  color: ${(props) => props.theme.colors.secondaryBlue};
  width: 18px;
  height: auto;
  margin-right: 0.5rem;
  font-weight: 100;
  margin: 0;
`;

export const CartIconWrapper = styled.div`
  background: white;
  border-radius: 50%;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
`;