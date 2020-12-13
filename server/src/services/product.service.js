const { Op, Sequelize } = require('sequelize');
const db = require('../../models');

const getProduct = async ({ id }) => {
  try {
      const product = await db.product.findOne({
        where: {
          id: id,
        },
        attributes: {
          include: [
            [
              Sequelize.literal(`(SELECT CAST(COUNT(*) as Int) FROM reviews WHERE reviews.product_id = product.id
                )`),
              'reviewsCount',
            ],
            [
              Sequelize.literal(`(SELECT ROUND(AVG(reviews.rating),1) FROM reviews WHERE reviews.product_id = product.id
                )`),
              'averageRating',
            ],
          ],
        },
      });
      return {
        ...product.dataValues
      }
  } catch(e) {
    throw new Error('Failed to fetch product data');
  }
};

const getProducts = async ({
  searchTerm, isProductSearch, skip, limit,
}) => {

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
      attributes: ['id', 'name', 'image', 'price'],
    });

    return searchProducts;
  }

  return [];
};

module.exports = {
  getProduct,
  getProducts,
};
