import Promise from 'bluebird';

import { fileName, eachFromFolder } from '../../utils';

import createSequelizeInstance from './createSequelizeInstance';
import registerFactoryAdapter from './registerFactoryAdapter';

export default function SequelizeInitializer(application) {
  const { database } = application.config;

  if(!database) {
    return () => Promise.resolve();
  }

  const sequelize = createSequelizeInstance(application);

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

  application.on('test:initialize', registerFactoryAdapter);

  return () => sequelize.sync();
}
