import interopRequire from 'interop-require';

export default ({ env, path }) => {
  const paths = {
    app: path('app'),
    build: path('build'),
    config: path('config'),
    tasks: path('tasks')
  };

  const config = interopRequire(path('config', env));

  config.database = interopRequire(path('config', 'database'))[env];

  return { paths, config };
};