import React, { useState } from 'react';
// import Downshift, {UseComboboxState} from "downshift";
import { render } from 'react-dom';
import styled from 'styled-components';
import { useApolloClient } from '@apollo/react-hooks';
import Router from 'next/router';
import slug from 'slug';
import debounce from 'lodash.debounce';
import Downshift from './Downshift';
import { productsQuery } from './Products';

const SearchStyles = styled.div`
  position: relative;
  input {
    padding: 0.7rem 0.9rem;
    border: none;
    transition: width 0.2s ease-in-out;
    width: 300px;
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    border-radius: 5%;

    &:focus {
      outline: none;
      width: 400px;
    }
  }
`;

const SearchItem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const client = useApolloClient();

  const routeToItem = (item) => {
    Router.push({
      pathname: `/product/${slug(item.name)}`,
      query: {
        id: item.id,
      },
    });
  };

  const handleInputChange = debounce(async (e) => {
    setLoading(false);

    const res = await client.query({
      query: productsQuery,
      variables: {
        searchTerm: e.target.value,
        isProductSearch: true,
      },
    });

    setLoading(false);
    setItems(res.data.products);
  }, 200);

  return (
    <SearchStyles>
      <Downshift routeToItem={routeToItem} handleInputChange={handleInputChange} items={items} setItems={setItems} loading={loading} />
    </SearchStyles>
  );
};

export default SearchItem;
