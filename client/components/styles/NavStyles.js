import styled from 'styled-components';
import { FaShoppingCart, FaUser } from 'react-icons/fa';

export const NavStyles = styled.nav`
  display: flex;
  align-items: center;
`;

export const NavLink = styled.div`
  display: flex;
  cursor: pointer;
  padding: 1rem 1rem;
  position: relative;
`;

export const StyledCartIcon = styled(FaShoppingCart)`
  color: ${(props) => props.theme.colors.black};
  width: 20px;
  height: auto;
  margin-right: 0.5rem;
`;

export const StyledUserIcon = styled(FaUser)`
  color: ${(props) => props.theme.colors.black};
  width: 20px;
  height: auto;
  margin-right: 0.5rem;
`;

export const LinkTitle = styled.h4`
  font-size: 1.25rem;
  color: ${(props) => props.theme.colors.black};
  margin-right: 0.5rem;
  text-align: center;
`;

export const NumberOfItemsInCart = styled.div`
  background: ${(props) => props.theme.colors.red};
  border-radius: 20%;
  display: flex;
  align-items: center;
  height: 1rem;
  color: ${(props) => props.theme.colors.white};
  position: absolute;
  font-size: 0.7rem;
  top: 50%;
  padding: 0.2rem;
`;
