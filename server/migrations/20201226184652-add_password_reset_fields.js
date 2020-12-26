'use-strict'

module.exports = {
  up: (queryInterface, Sequelize) => Promise.all([
    queryInterface.addColumn(
      'users', // name of Source model
      'password_reset_token', // name of the key we're adding
      {
        type: Sequelize.STRING,
        allowNull: true,
      },
    ),
    queryInterface.addColumn(
      'users', // name of Source model
      'password_reset_token_expiry', // name of the key we're adding
      {
        type: Sequelize.DATE,
        allowNull: true,
      },
    ),
  ]),

  down: (queryInterface, Sequelize) => Promise.all[
    (queryInterface.removeColumn(
      'users', // name of Source model
      'password_reset_token', // key we want to remove
    ),
    queryInterface.removeColumn(
      'users', // name of Source model
      'password_reset_token_expiry', // key we want to remove
    ))
  ],
};