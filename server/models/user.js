module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    date_of_birth: DataTypes.DATE,
    phone: DataTypes.STRING,
    password: DataTypes.STRING,
    password_reset_token: DataTypes.STRING,
    password_reset_token_expiry: DataTypes.DATE
  }, {});
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};
