export default (sequelize, DataTypes) => {
  const Entry = sequelize.define('entry', {
    title: DataTypes.STRING,
    url: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    classMethods: {
      associate(models) {
        Entry.belongsTo(models.User);
      }
    }
  });

  return Entry;
};
