const { v4 } = require('uuid');
const { requiresLogin } = require('./utils');
const { reviewService } = require('../services');

const ReviewMutations = {
  createReview: requiresLogin((parent, args, { db, req }, info) => reviewService.createReview({ ...args, userId: req.user.id })),
};

const ReviewQueries = {
  reviews: (parent, { productId }, { req }, info) => reviewService.getReviews({ productId }),
};

module.exports = {
  ReviewMutations,
  ReviewQueries,
};
