module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.addColumn(
    'reviews', // name of Source model
    'rating', // name of the key we're adding
    {
      type: Sequelize.INTEGER,
    },
  ),

  down: (queryInterface, Sequelize) => queryInterface.removeColumn('reviews', 'rating'),
};
