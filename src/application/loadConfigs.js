import interopRequire from 'interop-require';

import { fileName, eachFromFolder } from '../utils';

export default (application) => {
  const { env, pathTo } = application;

  const paths = {
    app: pathTo('app'),
    build: pathTo('build'),
    config: pathTo('config'),
    tasks: pathTo('tasks')
  };

  const appConfig = interopRequire(pathTo('config', 'environments', env));

  eachFromFolder(paths.config, (configFile) => {
    const config = interopRequire(pathTo('config', configFile));
    const configName = fileName(configFile);

    if(typeof config === 'object') {
      appConfig[configName] = config[env];
    } else {
      appConfig[configName] = config(application);
    }
  });

  return { paths, config: appConfig };
};
