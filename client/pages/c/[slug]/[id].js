import React from 'react';
import CategoryProducts from '../../../components/CategoryProducts';

const CategoryPage = ({ router }) => {
  const categoryId = parseInt(router.query.id);
  const page = parseInt(router.query.page);

  return (
    <CategoryProducts
      categoryId={categoryId}
      page={page || 1}
      displayAllItems
    />
  );
};

export default CategoryPage;
