import interopRequire from 'interop-require';

import eachFromFolder from '../utils/eachFromFolder';

export default (application, factory) => {
  const factoriesPath = application.pathTo.bind(null, 'test', 'factories');

  eachFromFolder(factoriesPath(), (file) => {
    const modelFactory = interopRequire(factoriesPath(file));
    modelFactory(factory, application.models);
  });
};
