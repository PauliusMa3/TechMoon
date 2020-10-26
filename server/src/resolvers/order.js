const { orderService, cartService } = require('../services');
const { requiresLogin } = require('./utils');

const OrderMutations = {
  createOrder: async(parent, args, { req }, info) =>  {

    const paymentSecret = await orderService.createOrder({ req });
    return {
      clientSecret: paymentSecret.clientSecret,
    };
  }

};

const OrderQueries = {

};

module.exports = {
  OrderMutations,
  OrderQueries,
};
