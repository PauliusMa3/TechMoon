const { productCategoryService } = require('../services');

const CategoryQueries = {
  categories: async (parent, args, ctx, info) => productCategoryService.getCategories(),
};

module.exports = {
  CategoryQueries,
};
