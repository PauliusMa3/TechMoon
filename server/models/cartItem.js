'use strict';
module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define('cartItem', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'product',
            key: 'product_id'
        }
    },
    quantity: DataTypes.INTEGER,
    cart_id: {
        type: DataTypes.STRING,
        references: {
            model: 'cart',
            key: 'cart_id'
        }
    }
  }, {});
  CartItem.associate = function(models) {
    // associations can be defined here
    CartItem.belongsTo(models.cart, {foreignKey: 'cart_id' })
    CartItem.belongsTo(models.product, {foreignKey: 'product_id'})
  };
  return CartItem;
};