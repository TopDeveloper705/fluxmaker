import Sequelize from 'sequelize';
import dialectMap from './dialectMap';

export default (application) => {
  const { database } = application.config;

  if(!database.dialectModulePath) {
    database.dialectModulePath = application.pathTo('node_modules', dialectMap[database.dialect]);
  }

  const sequelize = new Sequelize(database.database,
                                  database.username,
                                  database.password,
                                  database);

  return sequelize;
}
