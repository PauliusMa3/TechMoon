"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn(
        "carts", // name of Source model
        "session_id", // name of the key we're adding
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
      queryInterface.addColumn(
        "carts", // name of Source model
        "status", // name of the key we're adding
        {
          type: Sequelize.STRING,
          allowNull: true,
        }
      ),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all[
      (queryInterface.removeColumn(
        "carts", // name of Source model
        "session_id" // key we want to remove
      ),
      queryInterface.removeColumn(
        "carts", // name of Source model
        "status" // key we want to remove
      ))
    ];
  },
};
