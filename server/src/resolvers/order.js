const { orderService, cartService } = require('../services');
const { requiresLogin } = require('./utils');

const OrderMutations = {
  createOrder: requiresLogin(async (parent, args, { req }, info) => {
    const paymentSecret = await orderService.createOrder({ userId: req.user.id });

    return {
      clientSecret: paymentSecret.clientSecret,
    };
  }),
};

const OrderQueries = {

};

module.exports = {
  OrderMutations,
  OrderQueries,
};
