'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'reviews', // name of Source model
      'rating', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
      }
    );
  },

  down: (queryInterface, Sequelize) => {
   return queryInterface.removeColumn('reviews', 'rating')
  }
};
