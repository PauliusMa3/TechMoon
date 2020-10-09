const {productCategoryService} = require('../services')

const CategoryQueries = {
    categories: async(parent, args, ctx,info) => {
        return productCategoryService.getCategories();
    }
}

module.exports = {
    CategoryQueries
}