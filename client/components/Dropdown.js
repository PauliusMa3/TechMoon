import React, { useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import {NavLink, LinkTitle} from './styles/NavStyles';
import useClickOutside from './useClickOutside';
import {DropdownStyles, DropdownListWrapper} from './styles/DropdownStyles';

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  
  const toggleOpen = () => setOpen(!open);

  const onItemClick = (item) => {
    if(item.pathname) {
        router.push(item.pathname);
    } else {
      item.action();
    }
    setOpen(false);
  }

  const dropdownRef = useClickOutside(toggleOpen);

  return (
    <DropdownStyles>
      <div role="button" onKeyPress={toggleOpen} onClick={toggleOpen}>
        <NavLink>
          <LinkTitle>{title}</LinkTitle>
        </NavLink>
        {open && (
          <DropdownListWrapper ref={dropdownRef}>
              <ul>
                {items.map((item) => {
                  return (
                    <li onClick={() => onItemClick(item)}>
                      {item.title}
                      <Icon icon={item.icon}/>
                    </li>
                  );
                })}
              </ul>
          </DropdownListWrapper>
        )}
      </div>
    </DropdownStyles>
  );
};


const Icon = ({icon}) => {

  const StyledIcon = styled(icon)`
    width: 18px;
    height: auto;
    margin-right: 0.5rem;
    font-weight: 100;

    &:hover {
      fill: ${(props) => props.theme.colors.tertiaryBlue};
      transition: fill 0.1s ease-out;
    }
  `;

  return <StyledIcon />

}
export default Dropdown;
