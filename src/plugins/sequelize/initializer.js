import Promise from 'bluebird';
import Sequelize from 'sequelize';

import { fileName, eachFromFolder } from '../../utils';
import dialectMap from './dialectMap';

export default function SequelizeInitializer(application) {
  const { database } = application.config;

  if(!database) {
    return () => Promise.resolve();
  }

  if(!database.dialectModulePath) {
    database.dialectModulePath = application.pathTo('node_modules', dialectMap[database.dialect]);
  }

  const sequelize = new Sequelize(database.database,
                                  database.username,
                                  database.password,
                                  database);

  const models = {};

  const modelsPath = application.pathTo.bind(null, 'app', 'models');

  try {
    eachFromFolder(modelsPath(), (file) => {
      const model = sequelize.import(modelsPath(file));
      models[fileName(file)] = model;
    });

    Object.keys(models).forEach((modelName) => {
      if('associate' in models[modelName]) {
        models[modelName].associate(models);
      }
    });
  } catch(e) {
    return () => Promise.reject(e);
  }

  application.database = sequelize;
  application.models = models;

  return () => sequelize.sync();
}
