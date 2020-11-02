import React from 'react';
import CategoryProducts from '../../../components/CategoryProducts';

const CategoryPage = ({ router }) => {
  const categoryId = parseInt(router.query.id);
  const page = parseInt(router.query.page);

  return (<div>Hello</div>
  );
};

export default CategoryPage;
