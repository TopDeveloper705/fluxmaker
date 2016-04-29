import { fileName, eachFromFolder } from '../../utils';

export default (application, sequelize) => {
  const models = {};

  const modelsPath = application.pathTo.bind(null, 'app', 'models');

  eachFromFolder(modelsPath(), (file) => {
    const model = sequelize.import(modelsPath(file));
    models[fileName(file)] = model;
  });

  Object.keys(models).forEach((modelName) => {
    if('associate' in models[modelName]) {
      models[modelName].associate(models);
    }
  });

  return models;
};
