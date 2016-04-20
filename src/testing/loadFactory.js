import Promise from 'bluebird';
import { Factory } from 'factory-girl';
import interopRequire from 'interop-require';

import eachFromFolder from '../utils/eachFromFolder';

export default (application) => {
  const factory = (new Factory()).promisify(Promise);

  const factoriesPath = application.pathTo.bind(null, 'test', 'factories');

  eachFromFolder(factoriesPath(), (file) => {
    const modelFactory = interopRequire(factoriesPath(file));
    modelFactory(factory, application.models);
  });

  return factory;
};
