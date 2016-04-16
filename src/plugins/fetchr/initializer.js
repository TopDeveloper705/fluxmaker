import interopRequire from 'interop-require';
import Promise from 'bluebird';

import { fileName, eachFromFolder } from '../../utils';

export default function FetchrInitializer(application) {
  const fetchr = application.flux.getPlugin('FetchrPlugin');

  if(!fetchr) {
    return () => Promise.resolve();
  }

  return () => new Promise((resolve, reject) => {
    const servicesPath = application.pathTo.bind(null, 'app', 'services');

    const services = {};

    try {
      eachFromFolder(servicesPath(), (file) => {
        const service = interopRequire(servicesPath(file));
        services[fileName(file)] = service;
        fetchr.registerService(service);
      });

      application.services = services;

      application.server.middlewares.use(fetchr.getXhrPath(), fetchr.getMiddleware());

      resolve();
    } catch(e) {
      reject(e);
    }
  });
}
