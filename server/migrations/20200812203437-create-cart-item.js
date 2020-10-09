'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('cartItems', {
      id: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    product_id: {
      type: Sequelize.INTEGER,
      references: {
          model: 'products',
          key: 'id'
      }
    },
    cart_id: {
      type: Sequelize.STRING,
      onDelete: 'CASCADE',
      references: {
          model: 'carts',
          key: 'id'
      }
    },
      quantity: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('cartItems');
  }
};