module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: DataTypes.STRING,
    sku: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DOUBLE,
    image: DataTypes.TEXT,
    large_image: DataTypes.TEXT,
  }, {});
  Product.associate = function (models) {
    Product.belongsTo(models.productCategory, { foreignKey: 'id' });
    Product.hasMany(models.review, {
      foreignKey: 'product_id',
      onDelete: 'cascade',
    });
  };
  return Product;
};
