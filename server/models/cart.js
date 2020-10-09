module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define(
    'cart',
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.STRING,
        references: {
          model: 'user',
          key: 'user_id',
        },
      },
      session_id: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {},
  );
  Cart.associate = function (models) {
    Cart.belongsTo(models.user, {
      foreignKey: { name: 'user_id', allowNull: true },
      onDelete: 'cascade',
    });
    Cart.hasMany(models.cartItem, {
      foreignKey: 'cart_id',
      onDelete: 'cascade',
    });
  };
  return Cart;
};
