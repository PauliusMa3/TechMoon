import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import slug from 'slug';
import CategoryProducts from './CategoryProducts';

const CategoryStyles = styled.div`
    border: 1px solid ${(props) => props.theme.colors.lightGrey};
    padding: 1rem;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
    overflow-x: auto;

    a {
        font-family: 'Mont-bold';
        font-size: 1.2rem;
        color: ${(props) => props.theme.colors.black};

        &:hover {
            color: ${(props) => props.theme.colors.secondaryBlue};
        }
    }
`;

const Category = ({ category }) => {
  const queryString = '/c/[slug]/[id]';
  return (
    <CategoryStyles>
      <Link href={queryString} as={`/c/${slug(category.name)}/${category.id}`}>
        <a>{category.name}</a>
      </Link>
      <CategoryProducts categoryId={category.id} limit={2} page={1} />
    </CategoryStyles>
  );
};

export default Category;
