module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([queryInterface.addColumn(
    'reviews', // name of Source model
    'user_id', // name of the key we're adding
    {
      type: Sequelize.STRING,
      references: {
        model: 'users', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
  ),
  queryInterface.addColumn(
    'reviews', // name of Source model
    'product_id', // name of the key we're adding
    {
      type: Sequelize.INTEGER,
      references: {
        model: 'products', // name of Target model
        key: 'id', // key in Target model that we're referencing
      },
    },
  ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all[queryInterface.removeColumn(
    'reviews', // name of Source model
    'user_id', // key we want to remove
  ),
  queryInterface.removeColumn(
    'reviews', // name of Source model
    'product_id', // key we want to remove
  )
  ],
};
