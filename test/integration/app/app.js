import { Application } from 'fluxmaker';

import Sequelize from 'fluxmaker/plugins/sequelize';
import Fetchr from 'fluxmaker/plugins/fetchr';
import ServerRendering from 'fluxmaker/plugins/serverRendering';

import flux from './flux';

export default (config) => {
  config.env = config.env || process.env.NODE_ENV;

  const application = new Application(config, { flux });

  application.plug(Sequelize);
  application.plug(Fetchr);
  application.plug(ServerRendering);

  return application;
};
