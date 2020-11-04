import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { NavLink, LinkTitle } from './styles/NavStyles';
import useClickOutside from './useClickOutside';
import { DropdownStyles, DropdownListWrapper } from './styles/DropdownStyles';

const Dropdown = ({ title, items }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const closeDropdown = useCallback(
    () => {
      setOpen(false);
    },
    [],
  )

  const onItemClick = (item) => {
    if (item.pathname) {
      router.push(item.pathname);
    } else {
      item.action();
    }
    setOpen(false);
  };

  const dropdownRef = useClickOutside(closeDropdown);

  return (
      <DropdownStyles className="dropdown_wrapper" ref={dropdownRef}>
          <div
              onClick={() => {
                  if (open) {
                      return;
                  }
                  setOpen(true);
              }}
              role="button"
          >
              <NavLink className="title" >
                  <LinkTitle>{title}</LinkTitle>
              </NavLink>
              {open && <DropdownListWrapper>
                      <ul>
                          {items.map((item) => (
                              <li
                                  key={item.id}
                                  onClick={() => onItemClick(item)}
                              >
                                  {item.title}
                                  <Icon icon={item.icon} />
                              </li>
                          ))}
                      </ul>
                  </DropdownListWrapper>}
          </div>
      </DropdownStyles>
  );
};

const Icon = ({ icon }) => {
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

  return <StyledIcon />;
};
export default Dropdown;
