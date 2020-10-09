
const {ProductQueries} = require('./product');
const {UserMutations} = require('./user');
const {ReviewQueries, ReviewMutations} = require('./review');
const {CartQueries, CartMutations} = require('./cart');
const { CategoryQueries }  = require('./category');
const {OrderMutations, OrderQueries} = require('./order');

const rootResolver = {
    Query: {
        ...ProductQueries,
        ...ReviewQueries,
        ...CartQueries,
        ...CategoryQueries,
        ...OrderQueries
    },
    Mutation: {
        ...UserMutations,
        ...ReviewMutations,
        ...CartMutations,
        ...OrderMutations
    }
}


module.exports = { rootResolver};