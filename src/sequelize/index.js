import path from 'path';

const sequelizerc = (root) => {
  const pathTo = path.join.bind(null, root);

  return {
    'config': pathTo('config', 'database.js'),
    'migrations-path': pathTo('db', 'migrate'),
    'seeders-path': pathTo('db', 'seeds'),
    'models-path': pathTo('app', 'models')
  };
};

export { sequelizerc };
