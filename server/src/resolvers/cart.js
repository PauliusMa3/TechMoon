const { v4 } = require('uuid');
const { requiresLogin } = require('./utils');
const { cartService } = require('../services');

const CartQueries = {
  cart: async (parent, args, { req }, info) => {
    const result = cartService.fetchCart({ req });
    return result;
  },
};

const CartMutations = {
  addToCart: (parent, args, { db, req }, info) => {
    console.log('access here cart resolver');
    return cartService.addToCart({ ...args, req });
  },
  removeFromCart: requiresLogin((parent, args, ctx) => cartService.removeFromCart(args)),
  deleteCart: async (parent, args, ctx, info) => cartService.deleteCart({ cartId: args.cartId }),
};

module.exports = {
  CartQueries,
  CartMutations,
};
