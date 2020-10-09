'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('review', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    user_id: {type: DataTypes.STRING,
    references: {
      model: 'User',
      key: 'user_id',
    }},
  
    product_id: {type: DataTypes.INTEGER,     
    references: {
      model: 'Product',
      key: 'product_id',
    }},
    rating: DataTypes.INTEGER
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.user, {foreignKey: 'user_id'})
    Review.belongsTo(models.product, {foreignKey: 'product_id'})
  };
  return Review;
};