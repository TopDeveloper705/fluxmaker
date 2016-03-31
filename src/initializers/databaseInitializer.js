import fs from 'fs';
import Sequelize from 'sequelize';

export default (server) => {
  const { database } = server.config;

  const dialectMap = {
    mariadb: 'mysql',
    mysql: 'mysql',
    postgres: 'pg',
    sqlite: 'sqlite3',
    mssql: 'tedious'
  };

  database.dialectModulePath = server.path('node_modules', dialectMap[database.dialect]);

  const sequelize = new Sequelize(database.database,
                                  database.username,
                                  database.password,
                                  database);

  const models = {};

  const modelsPath = server.path.bind(null, 'app', 'models');

  fs.readdirSync(modelsPath())
    .filter((file) => file.indexOf('.') !== 0 && file.indexOf('index.js') !== 0)
    .forEach((file) => {
      let model = sequelize.import(modelsPath(file));
      models[file.split('.')[0]] = model;
    });

  Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  server.models = models;

  return () => sequelize.sync();
};
