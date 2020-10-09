module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('category', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {});
  Category.associate = function (models) {
    // associations can be defined here
    Category.belongsTo(models.productCategory, { foreignKey: 'id' });
  };
  return Category;
};
