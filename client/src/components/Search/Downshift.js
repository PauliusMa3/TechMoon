import React from 'react';
import Downshift from 'downshift';
import styled, { css } from 'styled-components';
import { ifProp } from 'styled-tools';
import formatMoney from '../../utils/formatMoney';

const Dropdown = styled.div`
  position: absolute;
  width: 100%;
  z-index: 9999;
  border: 1px solid ${(props) => props.theme.colors.lightGrey};
`;

const DropdownItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;

  ${ifProp(
    'highlighted',
    css`
      background: ${(props) => props.theme.colors.lightGrey};
    `,
    css`
      background: ${(props) => props.theme.colors.white};
    `,
  )}

  h4 {
    margin-left: auto;
    font-family: 'Mont-bold';
  }

  img {
    height: 30px;
    width: 30px;
    background-size: cover;
    margin-right: 1rem;
  }
`;

const DownshiftCmp = ({
  routeToItem,
  handleInputChange,
  items,
  loading,
}) => (
  <Downshift
    onChange={routeToItem}
    itemToString={(item) => (item ? item.name : '')}
  >
    {({
      getInputProps,
      getItemProps,
      isOpen,
      inputValue,
      highlightedIndex,
    }) => (
      <div>
        <input
          {...getInputProps({
            placeholder: 'Search...',
            type: 'search',
            name: 'search',
            onChange: (e) => {
              e.persist();
              handleInputChange(e);
            },
          })}
        />
        {isOpen && (
          <Dropdown invisible={!items.length && !loading && inputValue}>
            {items.map((item, index) => (
              <DropdownItem
                key={item.id}
                {...getItemProps({
                  item,
                })}
                highlighted={highlightedIndex === index}
              >
                <img src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <h4>{formatMoney(item.price)}</h4>
              </DropdownItem>
            ))}
            {!items.length && !loading && inputValue && (
              <DropdownItem>
                <div>
                  Nothing Found for
                  {' '}
                  <strong>{` "${inputValue}"`}</strong>
                </div>
              </DropdownItem>
            )}
          </Dropdown>
        )}
      </div>
    )}
  </Downshift>
);

export default DownshiftCmp;
