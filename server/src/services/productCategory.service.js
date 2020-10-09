const db = require('../../models');

const getCategories = async () => {
  const result = await db.category.findAll({
  });
  return result;
};

const getProductsForCategory = async ({ categoryId, limit, skip }) => {
  const result = await db.productCategory.findAndCountAll({
    where: {
      category_id: categoryId,
    },
    attributes: {
      exclude: ['createdAt', 'updatedAt'],
    },
    include: [
      {
        model: db.product,
      },
      {
        model: db.category,
      },
    ],
    limit,
    offset: skip,
    // order: [
    //     ['createdAt', 'DESC']
    // ]
  });

  console.log('result for pagination: ', result);

  const categoryProducts = result.rows.map((productCategory) => ({
    ...productCategory.product.dataValues,
  }));

  return {
    count: result.count,
    categoryName: result.rows[0].category.name,
    categoryId,
    products: [...categoryProducts],
  };
};

module.exports = {
  getCategories,
  getProductsForCategory,
};
