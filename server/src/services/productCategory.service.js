const db = require('../../models');

const getCategories = async () => {
  const result = await db.category.findAll({
  });
  return result;
};

const getProductsForCategory = async ({ categoryId, limit, skip }) => {
  try {
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



      const categoryProducts = result.rows.map((productCategory) => ({
        ...productCategory.product.dataValues,
      }));

      if(!categoryProducts.length) return [];

      return {
        count: result.count,
        categoryName: result.rows[0].category.name,
        categoryId,
        products: [...categoryProducts],
      };
  } catch(e) {
    throw e;
  }
};

module.exports = {
  getCategories,
  getProductsForCategory,
};
