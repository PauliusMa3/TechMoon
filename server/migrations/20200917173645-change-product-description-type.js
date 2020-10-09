'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'products', // name of Source model
      'description', // name of the key we're adding 
      {
        type: Sequelize.TEXT,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'products', // name of Source model
      'description', // name of the key we're adding 
      {
        type: Sequelize.STRING,
      }
    );
  }
};
