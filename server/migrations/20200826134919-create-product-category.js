'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.createTable('productCategories', {
        product_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
              model: 'products',
              key: 'id'
          }
        },
        category_id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          references: {
              model: 'categories',
              key: 'id'
          }
        }
      }).then(() => {
        return Promise.all([
          queryInterface.addIndex(
            'productCategories',
            ['product_id'],
            {
              indexName: 'idx_pc_product',
              indicesType: 'BTREE'
            }
          ),
          queryInterface.addIndex(
            'productCategories',
            ['category_id'],
            {
              indexName: 'idx_pc_category',
              indicesType: 'BTREE'
            }
          )
        ])
      })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('productCategories');
  }
};