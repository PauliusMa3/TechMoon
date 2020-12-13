const db = require('../../models');
const { orderService, cartService } = require('../services');
const { requiresLogin } = require('./utils');

const OrderMutations = {
  createOrder: async(parent, args, { req }, info) =>  {

    const paymentSecret = await orderService.createOrder({ req });
    return {
      clientSecret: paymentSecret.clientSecret,
    };
  },
};

const OrderQueries = {
  orders: requiresLogin((parent, args, { req }, info) => orderService.getOrders({ userId: req.user.id, ...args }))
};

module.exports = {
  OrderMutations,
  OrderQueries,
};
