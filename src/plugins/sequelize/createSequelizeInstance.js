import Sequelize from 'sequelize';
import resolve from 'resolve';
import dialectMap from './dialectMap';

export default (application) => {
  const { database } = application.config;

  if(!database.dialectModulePath) {
    database.dialectModulePath = resolve.sync(dialectMap[database.dialect], {
      basedir: application.root
    });
  }

  const sequelize = new Sequelize(database.database,
                                  database.username,
                                  database.password,
                                  database);

  return sequelize;
};
