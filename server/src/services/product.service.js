const db = require("../../models");
const { Op } = require("sequelize");

const getProduct = async ({ id }) => {
  const product = await db.product.findByPk(id);

  const reviewsCount = await db.review.count({
    where: {
      product_id: product.id,
    },
  });
  return {
    ...product.dataValues,
    reviewsCount,
  };
};

const getProducts = async ({ searchTerm, isProductSearch, skip, limit }) => {
  // if(!searchTerm && !isProductSearch) {
  //     // add limit & offset for pagination
  //     const products = await db.product.findAndCountAll({
  //         limit,
  //         offset: skip,
  //         order: [
  //             ['createdAt', 'DESC']
  //         ]
  //     });
  //     return {
  //         count: products.count,
  //         rows: products.rows
  //     }
  // }

  if (searchTerm && isProductSearch) {
    const searchProducts = await db.product.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
          {
            description: {
              [Op.iLike]: `%${searchTerm}%`,
            },
          },
        ],
      },
      attributes: ["id", "name", "image", "price"],
    });

    return searchProducts;
  }

  return [];
};

module.exports = {
  getProduct,
  getProducts,
};
