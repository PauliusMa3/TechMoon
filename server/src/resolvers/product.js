const { productService, productCategoryService } = require('../services');

const ProductQueries = {
  products: async (parent, args, { db, req }, info) => productService.getProducts({ ...args }),
  product: async (parent, args, { db, req }, info) => productService.getProduct({
    ...args,
  }),
  categoryProducts: async (parent, { categoryId, limit, skip }, ctx, info) => productCategoryService.getProductsForCategory({ categoryId, limit, skip }),

};

module.exports = {
  ProductQueries,
};
