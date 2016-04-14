import createApplication from '../app';

export default (config) => {
  const application = global.$app = createApplication(config);

  application.initialize()
    .then(() => application.server.start())
    .then(() => application.log('info', 'Application listening on port 3000'))
    .catch((error) => {
      application.log('error', error);
      application.exit();
    });
};
