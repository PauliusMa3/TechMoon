'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('orderItem', {
    id: {
      type: DataTypes.STRING,
      alowNull: false,
      primaryKey: true,
      unique: true
    },
    order_id: {
      type: DataTypes.STRING,
      references: {
          model: 'order',
          key: 'order_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER
    },
  }, {});
  OrderItem.associate = function(models) {
    OrderItem.belongsTo(models.order, {foreignKey: 'order_id'})
    OrderItem.belongsTo(models.product, {foreignKey: 'product_id'})
  };
  return OrderItem;
};