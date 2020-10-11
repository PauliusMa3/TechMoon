const { orderService, cartService } = require('../services');
const { requiresLogin } = require('./utils');

const OrderMutations = {
  createOrder: (parent, args, { req }, info) => orderService.createOrder({ userId: req.user.id })

    // return {
    //   clientSecret: paymentSecret.clientSecret,
    // };
};

const OrderQueries = {

};

module.exports = {
  OrderMutations,
  OrderQueries,
};
