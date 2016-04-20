import Promise from 'bluebird';

import { fileName, eachFromFolder } from '../../utils';

import createSequelizeInstance from './createSequelizeInstance';
import registerFactoryAdapter from './registerFactoryAdapter';
import loadModels from './loadModels';

export default function SequelizeInitializer(application) {
  const { database } = application.config;

  if(!database) {
    return () => Promise.resolve();
  }

  const sequelize = createSequelizeInstance(application);
  let models;

  try {
    models = loadModels(application, sequelize);
  } catch(e) {
    return () => Promise.reject(e);
  }

  application.database = sequelize;
  application.models = models;

  application.on('test:initialize', registerFactoryAdapter);

  return () => sequelize.sync();
}
