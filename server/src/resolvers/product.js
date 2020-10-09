const {productService, productCategoryService} = require('../services');

const ProductQueries = {
    products: async(parent, args, {db, req}, info) => {
        return productService.getProducts({...args});
    },
    product: async(parent, args, {db,req}, info) => {
        return productService.getProduct({
            ...args
        });
    },
    categoryProducts: async(parent, {categoryId, limit, skip}, ctx,info) => {
        return productCategoryService.getProductsForCategory({categoryId, limit, skip})
    }

}


module.exports = {
    ProductQueries
}