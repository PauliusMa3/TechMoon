module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    id: {
      type: DataTypes.STRING,
      alowNull: false,
      primaryKey: true,
      unique: true,
    },
    charge: {
      type: DataTypes.STRING,
      alowNull: false,
    },
    user_id: {
      type: DataTypes.STRING,
      references: {
        model: 'user',
        key: 'user_id',
      },
    },
    amount: {
      type: DataTypes.INTEGER,
    },
  }, {});
  Order.associate = function (models) {
    Order.belongsTo(models.user, { foreignKey: 'user_id', onDelete: 'cascade' });
    Order.hasMany(models.orderItem, { foreignKey: 'order_id' });
  };
  return Order;
};
