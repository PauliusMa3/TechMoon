const {v4} = require('uuid');
const {requiresLogin} = require('./utils');
const {reviewService} =require('../services');

const ReviewMutations  ={
    createReview: requiresLogin((parent, args, {db, req}, info) => {
        return reviewService.createReview({...args, userId: req.user.id}); 
    })
}

const ReviewQueries  ={
    reviews: (parent, {productId}, {req}, info) => {
        return reviewService.getReviews({productId});
    }
}

module.exports = {
    ReviewMutations,
    ReviewQueries
}