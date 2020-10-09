const db = require('../../models');
const {v4} = require('uuid');

const createReview = async({title,description,rating, productId, userId}) => {

    await db.review.create({
        id: v4(),
        title: title,
        description: description,
        user_id: userId,
        rating: rating,
        product_id: productId
    }).catch(err => {throw new Error('Failed to create a review')});

    return {
        message: 'Review was successfully created'
    }
}

const getReviews = async({productId }) => {
    const reviews = await db.review.findAll({where: {
        product_id: productId
    },
    include: [{
        model: db.user, attributes: ['name']
      }]
  })
    const fetchedReviews = reviews.map(review => ({
          id: review.id,
          title: review.title,
          description: review.description,
          createdAt: review.createdAt,
          author: review.user.name,
          rating: review.rating,
      }))
      
    return fetchedReviews;
}

module.exports = {
    createReview,
    getReviews
}
