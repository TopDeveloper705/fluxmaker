export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    classMethods: {
      associate(models) {
        User.hasMany(models.Entry);
      }
    }
  });

  return User;
};
