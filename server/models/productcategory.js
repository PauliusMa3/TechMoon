module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('productCategory', {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Product',
        key: 'product_id',
      },
    },
    category_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Category',
        key: 'category_id',
      },
    },
  }, {
    indexes: [
      {
        name: 'idx_pc_product',
        using: 'BTREE',
        fields: [
          'product_id',
        ],
      },
      {
        name: 'idx_pc_category',
        using: 'BTREE',
        fields: [
          'category_id',
        ],
      },
    ],
  });
  ProductCategory.associate = function (models) {
    // associations can be defined here
    ProductCategory.belongsTo(models.product, { foreignKey: 'product_id' });
    ProductCategory.belongsTo(models.category, { foreignKey: 'category_id' });
  };
  return ProductCategory;
};
